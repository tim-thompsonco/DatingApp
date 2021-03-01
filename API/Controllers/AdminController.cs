using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers {
	public class AdminController : BaseApiController {
		private readonly UserManager<AppUser> _userManager;

		public AdminController(UserManager<AppUser> userManager) {
			_userManager = userManager;
		}

		[Authorize(Policy = "RequireAdminRole")]
		[HttpGet("users-with-roles")]
		public async Task<ActionResult> GetUsersWithRoles() {
			var users = await _userManager.Users
			  .Include(r => r.UserRoles)
			  .ThenInclude(r => r.Role)
			  .OrderBy(user => user.UserName)
			  .Select(user => new {
				  user.Id,
				  Username = user.UserName,
				  Roles = user.UserRoles.Select(r => r.Role.Name).ToList()
			  })
			  .ToListAsync();

			return Ok(users);
		}

		[HttpPost("edit-roles/{username}")]
		public async Task<ActionResult> EditRoles(string username, [FromQuery] string roles) {
			string[] selectedRoles = roles.Split(",").ToArray();

			AppUser user = await _userManager.FindByNameAsync(username);

			if (user == null) {
				return NotFound("Could not find user");
			}

			IList<string> userRoles = await _userManager.GetRolesAsync(user);

			IdentityResult result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

			if (!result.Succeeded) {
				return BadRequest("Failed to add new roles for user");
			}

			result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

			if (!result.Succeeded) {
				return BadRequest("Failed to remove old roles for user");
			}

			return Ok(await _userManager.GetRolesAsync(user));
		}

		[Authorize(Policy = "ModeratePhotoRole")]
		[HttpGet("photos-to-moderate")]
		public ActionResult GetPhotosForModeration() {
			return Ok("Admins or moderators can see this");
		}
	}
}