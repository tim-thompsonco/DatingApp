using API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Data {
	public class Seed {
		public static async Task SeedUsers(DataContext context) {
			if (await context.Users.AnyAsync()) {
				return;
			}

			string userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
			List<AppUser> users = JsonSerializer.Deserialize<List<AppUser>>(userData);

			foreach (AppUser user in users) {
				using HMACSHA512 hmac = new HMACSHA512();

				user.UserName = user.UserName.ToLower();
				user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
				user.PasswordSalt = hmac.Key;

				context.Users.Add(user);
			}

			await context.SaveChangesAsync();
		}
	}
}