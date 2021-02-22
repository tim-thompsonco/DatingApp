using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers {
	[Authorize]
	public class LikesController : BaseApiController {
		private readonly IUserRepository _userRepository;
		private readonly ILikesRepository _likesRepository;

		public LikesController(IUserRepository userRepository, ILikesRepository likesRepository) {
			_likesRepository = likesRepository;
			_userRepository = userRepository;
		}

		[HttpPost("{username}")]
		public async Task<ActionResult> AddLike(string username) {
			AppUser likedUser = await _userRepository.GetUserByUsernameAsync(username);

			if (likedUser == null) {
				return NotFound();
			}

			int sourceUserId = User.GetUserId();
			AppUser sourceUser = await _likesRepository.GetUserWithLikes(sourceUserId);

			if (sourceUser.UserName == username) {
				return BadRequest("You cannot like yourself");
			}

			UserLike userLike = await _likesRepository.GetUserLike(sourceUserId, likedUser.Id);

			if (userLike != null) {
				return BadRequest("You already liked this user");
			}

			userLike = new UserLike {
				SourceUserId = sourceUserId,
				LikedUserId = likedUser.Id
			};

			sourceUser.LikedUsers.Add(userLike);

			if (await _userRepository.SaveAllAsync()) {
				return Ok();
			}

			return BadRequest("Failed to like user");
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<LikeDto>>> GetUserLikes([FromQuery] LikesParams likesParams) {
			PagedList<LikeDto> users = await _likesRepository.GetUserLikes(likesParams);
			likesParams.UserId = User.GetUserId();

			Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

			return Ok(users);
		}
	}
}