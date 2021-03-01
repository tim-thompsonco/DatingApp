using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Data {
	public class Seed {
		public static async Task SeedUsers(UserManager<AppUser> userManager) {
			if (await userManager.Users.AnyAsync()) {
				return;
			}

			string userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
			List<AppUser> users = JsonSerializer.Deserialize<List<AppUser>>(userData);

			foreach (AppUser user in users) {
				user.UserName = user.UserName.ToLower();

				await userManager.CreateAsync(user, "Pa$$w0rd");
			}
		}
	}
}