using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using API.SignalR;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace API.Extensions {
    public static class ApplicationServiceExtensions {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services, IConfiguration config) {
            services.AddSingleton<PresenceTracker>();
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<LogUserActivity>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(options => {
                string env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                string connStr;

                // Depending on if in development or production, use either Heroku-provided
                // connection string, or development connection string from env var.
                if (env == "Development") {
                    // Use connection string from file.
                    connStr = config.GetConnectionString("DefaultConnection");
                } else {
                    // Use connection string provided at runtime by Heroku.
                    string connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                    // Parse connection URL to connection string for Npgsql
                    connUrl = connUrl.Replace("postgres://", string.Empty);
                    string pgUserPass = connUrl.Split("@")[0];
                    string pgHostPortDb = connUrl.Split("@")[1];
                    string pgHostPort = pgHostPortDb.Split("/")[0];
                    string pgDb = pgHostPortDb.Split("/")[1];
                    string pgUser = pgUserPass.Split(":")[0];
                    string pgPass = pgUserPass.Split(":")[1];
                    string pgHost = pgHostPort.Split(":")[0];
                    string pgPort = pgHostPort.Split(":")[1];

                    connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};SSL Mode=Require;TrustServerCertificate=True";
                }

                // Whether the connection string came from the local development configuration file
                // or from the environment variable from Heroku, use it to set up your DbContext.
                options.UseNpgsql(connStr);
            });

            return services;
        }
    }
}