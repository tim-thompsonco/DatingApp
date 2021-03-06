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

		public MessageHub(IMessageRepository messageRepository, IMapper mapper) {
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

		private string GetGroupName(string caller, string other) {
			bool stringCompare = string.CompareOrdinal(caller, other) < 0;

			return stringCompare ? $"{caller}-{other}" : $"{other}-{caller}";
		}
	}
}