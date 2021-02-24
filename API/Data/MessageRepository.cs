using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data {
	public class MessageRepository : IMessageRepository {
		private readonly DataContext _context;
		private readonly IMapper _mapper;

		public MessageRepository(DataContext context, IMapper mapper) {
			_mapper = mapper;
			_context = context;
		}

		public void AddMessage(Message message) {
			_context.Messages.Add(message);
		}

		public void DeleteMessage(Message message) {
			_context.Messages.Remove(message);
		}

		public async Task<Message> GetMessage(int id) {
			return await _context.Messages.FindAsync(id);
		}

		public async Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams) {
			IQueryable<Message> query = _context.Messages
			  .OrderByDescending(message => message.MessageSent)
			  .AsQueryable();

			query = messageParams.Container switch {
				"Inbox" => query.Where(user => user.Recipient.UserName == messageParams.Username),
				"Outbox" => query.Where(user => user.Sender.UserName == messageParams.Username),
				_ => query.Where(user => user.Recipient.UserName == messageParams.Username && user.DateRead == null)
			};

			IQueryable<MessageDto> messages = query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider);

			return await PagedList<MessageDto>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
		}

		public Task<IEnumerable<MessageDto>> GetMessageThread(int currentUserId, int recipientId) {
			throw new System.NotImplementedException();
		}

		public async Task<bool> SaveAllAsync() {
			return await _context.SaveChangesAsync() > 0;
		}
	}
}