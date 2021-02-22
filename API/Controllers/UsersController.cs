using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers {
	[Authorize]
	public class UsersController : BaseApiController {
		private readonly IUserRepository _userRepository;
		private readonly IMapper _mapper;
		private readonly IPhotoService _photoService;

		public UsersController(IUserRepository userRepository, IMapper mapper,
			IPhotoService photoService) {
			_userRepository = userRepository;
			_mapper = mapper;
			_photoService = photoService;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers([FromQuery] UserParams userParams) {
			AppUser user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
			userParams.CurrentUsername = user.UserName;

			if (string.IsNullOrEmpty(userParams.Gender)) {
				userParams.Gender = user.Gender == "male" ? "female" : "male";
			}

			PagedList<MemberDto> users = await _userRepository.GetMembersAsync(userParams);

			Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

			return Ok(users);
		}

		[HttpGet("{username}", Name = "GetUser")]
		public async Task<ActionResult<MemberDto>> GetUser(string username) {
			return await _userRepository.GetMemberAsync(username);
		}

		[HttpPut]
		public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto) {
			AppUser user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

			_mapper.Map(memberUpdateDto, user);

			_userRepository.Update(user);

			if (await _userRepository.SaveAllAsync()) {
				return NoContent();
			} else {
				return BadRequest("Failed to update user!");
			}
		}

		[HttpPost("add-photo")]
		public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file) {
			AppUser user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

			CloudinaryDotNet.Actions.ImageUploadResult result = await _photoService.AddPhotoAsync(file);

			if (result.Error != null) {
				return BadRequest(result.Error.Message);
			}

			Photo photo = new Photo {
				Url = result.SecureUrl.AbsoluteUri,
				PublicId = result.PublicId
			};

			if (user.Photos.Count == 0) {
				photo.IsMain = true;
			}

			user.Photos.Add(photo);

			if (await _userRepository.SaveAllAsync()) {
				return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<PhotoDto>(photo));
			} else {
				return BadRequest("Problem adding photo!");
			}
		}

		[HttpPut("set-main-photo/{photoId}")]
		public async Task<ActionResult> SetMainPhoto(int photoId) {
			AppUser user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

			Photo photo = user.Photos.FirstOrDefault(photo => photo.Id == photoId);

			if (photo.IsMain) {
				return BadRequest("This is already your main photo.");
			}

			Photo currentMain = user.Photos.FirstOrDefault(photo => photo.IsMain);

			if (currentMain != null) {
				currentMain.IsMain = false;
			}

			photo.IsMain = true;

			if (await _userRepository.SaveAllAsync()) {
				return NoContent();
			} else {
				return BadRequest("Failed to set main photo.");
			}
		}

		[HttpDelete("delete-photo/{photoId}")]
		public async Task<ActionResult> DeletePhoto(int photoId) {
			AppUser user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

			Photo photo = user.Photos.FirstOrDefault(photo => photo.Id == photoId);

			if (photo == null) {
				return NotFound();
			}

			if (photo.IsMain) {
				return BadRequest("You cannot delete your main photo.");
			}

			if (photo.PublicId != null) {
				CloudinaryDotNet.Actions.DeletionResult result = await _photoService.DeletePhotoAsync(photo.PublicId);

				if (result.Error != null) {
					return BadRequest(result.Error.Message);
				}
			}

			user.Photos.Remove(photo);

			if (await _userRepository.SaveAllAsync()) {
				return Ok();
			}

			return BadRequest("Failed to delete user photo.");
		}
	}
}