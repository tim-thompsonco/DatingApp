using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Data {
    public class Seed {
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager) {
            if (await userManager.Users.AnyAsync()) {
                return;
            }

            string userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            List<AppUser> users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            if (users == null) {
                return;
            }

            List<AppRole> roles = new List<AppRole> {
        new AppRole{Name = "Member"},
        new AppRole{Name = "Admin"},
        new AppRole{Name = "Moderator"}
      };

            foreach (AppRole role in roles) {
                await roleManager.CreateAsync(role);
            }

            foreach (AppUser user in users) {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");
            }

            AppUser adminUser = new AppUser {
                UserName = "admin"
            };

            await userManager.CreateAsync(adminUser, "Pa$$w0rd");
            await userManager.AddToRolesAsync(adminUser, new[] { "Admin", "Moderator" });
        }
    }
}