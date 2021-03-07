using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace API {
    public class Program {
        public static async Task Main(string[] args) {
            IHost host = CreateHostBuilder(args).Build();
            using IServiceScope scope = host.Services.CreateScope();
            IServiceProvider services = scope.ServiceProvider;

            try {
                DataContext context = services.GetRequiredService<DataContext>();
                await context.Database.MigrateAsync();

                UserManager<AppUser> userManager = services.GetRequiredService<UserManager<AppUser>>();
                RoleManager<AppRole> roleManager = services.GetRequiredService<RoleManager<AppRole>>();
                await Seed.SeedUsers(userManager, roleManager);
            } catch (Exception ex) {
                ILogger<Program> logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occurred during migration.");
            }

            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) {
            return Host.CreateDefaultBuilder(args).ConfigureWebHostDefaults(webBuilder => {
                webBuilder.UseStartup<Startup>();
            });
        }
    }
}
