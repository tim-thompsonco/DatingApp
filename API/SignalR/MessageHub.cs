using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.SignalR {
    public class MessageHub : Hub {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IHubContext<PresenceHub> _presenceHub;
        private readonly PresenceTracker _tracker;

        public MessageHub(IUnitOfWork unitOfWork, IMapper mapper, IHubContext<PresenceHub> presenceHub, PresenceTracker tracker) {
            _tracker = tracker;
            _presenceHub = presenceHub;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public override async Task OnConnectedAsync() {
            HttpContext httpContext = Context.GetHttpContext();
            string otherUser = httpContext.Request.Query["user"].ToString();
            string groupName = GetGroupName(Context.User.GetUsername(), otherUser);

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            Group group = await AddToMessageGroup(groupName);

            await Clients.Group(groupName).SendAsync("UpdatedGroup", group);

            IEnumerable<MessageDto> messages = await _unitOfWork.MessageRepository.GetMessageThread(Context.User.GetUsername(), otherUser);

            if (_unitOfWork.HasChanges()) {
                await _unitOfWork.Complete();
            }

            await Clients.Caller.SendAsync("ReceiveMessageThread", messages);
        }

        public override async Task OnDisconnectedAsync(Exception exception) {
            Group group = await RemoveFromMessageGroup();

            await Clients.Group(group.Name).SendAsync("UpdatedGroup", group);

            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(CreateMessageDto createMessageDto) {
            string username = Context.User.GetUsername();

            if (username.ToLower() == createMessageDto.RecipientUsername.ToLower()) {
                throw new HubException("You cannot send messages to yourself");
            }

            AppUser sender = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
            AppUser recipient = await _unitOfWork.UserRepository.GetUserByUsernameAsync(createMessageDto.RecipientUsername);

            if (recipient == null) {
                throw new HubException("User not found");
            }

            Message message = new Message {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                Content = createMessageDto.Content
            };

            string groupName = GetGroupName(sender.UserName, recipient.UserName);

            Group group = await _unitOfWork.MessageRepository.GetMessageGroup(groupName);

            if (group.Connections.Any(user => user.Username == recipient.UserName)) {
                message.DateRead = DateTime.UtcNow;
            } else {
                List<string> connections = await _tracker.GetConnectionsForUser(recipient.UserName);

                if (connections != null) {
                    await _presenceHub.Clients.Clients(connections).SendAsync("NewMessageReceived",
                    new { username = sender.UserName, knownAs = sender.KnownAs });
                }
            }

            _unitOfWork.MessageRepository.AddMessage(message);

            if (await _unitOfWork.Complete()) {
                await Clients.Group(groupName).SendAsync("NewMessage", _mapper.Map<MessageDto>(message));
            }
        }

        private async Task<Group> AddToMessageGroup(string groupName) {
            Group group = await _unitOfWork.MessageRepository.GetMessageGroup(groupName);
            Connection connection = new Connection(Context.ConnectionId, Context.User.GetUsername());

            if (group == null) {
                group = new Group(groupName);
                _unitOfWork.MessageRepository.AddGroup(group);
            }

            group.Connections.Add(connection);

            if (await _unitOfWork.Complete()) {
                return group;
            }

            throw new HubException("Failed to join group");
        }

        private async Task<Group> RemoveFromMessageGroup() {
            Group group = await _unitOfWork.MessageRepository.GetGroupForConnection(Context.ConnectionId);

            Connection connection = group.Connections.FirstOrDefault(c => c.ConnectionId == Context.ConnectionId);
            _unitOfWork.MessageRepository.RemoveConnection(connection);

            if (await _unitOfWork.Complete()) {
                return group;
            }

            throw new HubException("Failed to remove connection from group");
        }

        private string GetGroupName(string caller, string other) {
            bool stringCompare = string.CompareOrdinal(caller, other) < 0;

            return stringCompare ? $"{caller}-{other}" : $"{other}-{caller}";
        }
    }
}