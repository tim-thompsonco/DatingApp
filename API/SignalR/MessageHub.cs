using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace API.SignalR {
	public class MessageHub : Hub {
		private readonly IMessageRepository _messageRepository;
		private readonly IMapper _mapper;
		private readonly IUserRepository _userRepository;

		public MessageHub(IMessageRepository messageRepository, IMapper mapper, IUserRepository userRepository) {
			_userRepository = userRepository;
			_mapper = mapper;
			_messageRepository = messageRepository;
		}

		public override async Task OnConnectedAsync() {
			HttpContext httpContext = Context.GetHttpContext();
			string otherUser = httpContext.Request.Query["user"].ToString();
			string groupName = GetGroupName(Context.User.GetUsername(), otherUser);

			await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

			var messages = await _messageRepository.GetMessageThread(Context.User.GetUsername(), otherUser);

			await Clients.Group(groupName).SendAsync("ReceiveMessageThread", messages);
		}

		public override async Task OnDisconnectedAsync(Exception exception) {
			await base.OnDisconnectedAsync(exception);
		}

		public async Task SendMessage(CreateMessageDto createMessageDto) {
			string username = Context.User.GetUsername();

			if (username.ToLower() == createMessageDto.RecipientUsername.ToLower()) {
				throw new HubException("You cannot send messages to yourself");
			}

			AppUser sender = await _userRepository.GetUserByUsernameAsync(username);
			AppUser recipient = await _userRepository.GetUserByUsernameAsync(createMessageDto.RecipientUsername);

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

			_messageRepository.AddMessage(message);

			if (await _messageRepository.SaveAllAsync()) {
				string group = GetGroupName(sender.UserName, recipient.UserName);

				await Clients.Group(group).SendAsync("NewMessage", _mapper.Map<MessageDto>(message));
			}
		}

		private string GetGroupName(string caller, string other) {
			bool stringCompare = string.CompareOrdinal(caller, other) < 0;

			return stringCompare ? $"{caller}-{other}" : $"{other}-{caller}";
		}
	}
}