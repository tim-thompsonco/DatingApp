using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

		[Authorize(Policy = "ModeratePhotoRole")]
		[HttpGet("photos-to-moderate")]
		public ActionResult GetPhotosForModeration() {
			return Ok("Admins or moderators can see this");
		}
	}
}