using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;

namespace API.Data {
    public class DataContext : IdentityDbContext<AppUser, AppRole, int,
  IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>,
  IdentityRoleClaim<int>, IdentityUserToken<int>> {
        public DbSet<UserLike> Likes { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Connection> Connections { get; set; }

        public DataContext(DbContextOptions options) : base(options) {
        }

        protected override void OnModelCreating(ModelBuilder builder) {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
              .HasMany(ur => ur.UserRoles)
              .WithOne(u => u.User)
              .HasForeignKey(ur => ur.UserId)
              .IsRequired();

            builder.Entity<AppRole>()
              .HasMany(ur => ur.UserRoles)
              .WithOne(r => r.Role)
              .HasForeignKey(ur => ur.RoleId)
              .IsRequired();

            builder.Entity<UserLike>().HasKey(key => new { key.SourceUserId, key.LikedUserId });

            builder.Entity<UserLike>()
              .HasOne(source => source.SourceUser)
              .WithMany(likes => likes.LikedUsers)
              .HasForeignKey(source => source.SourceUserId)
              .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserLike>()
                    .HasOne(liked => liked.LikedUser)
                    .WithMany(likedBy => likedBy.LikedByUsers)
                    .HasForeignKey(source => source.LikedUserId)
                    .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Message>()
              .HasOne(user => user.Recipient)
              .WithMany(message => message.MessagesReceived)
              .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
              .HasOne(user => user.Sender)
              .WithMany(message => message.MessagesSent)
              .OnDelete(DeleteBehavior.Restrict);

            builder.ApplyUtcDateTimeConverter();
        }
    }

    public static class UtcDateAnnotation {
        private const String IsUtcAnnotation = "IsUtc";
        private static readonly ValueConverter<DateTime, DateTime> UtcConverter =
          new ValueConverter<DateTime, DateTime>(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

        private static readonly ValueConverter<DateTime?, DateTime?> UtcNullableConverter =
          new ValueConverter<DateTime?, DateTime?>(v => v, v => v == null ? v : DateTime.SpecifyKind(v.Value, DateTimeKind.Utc));

        public static PropertyBuilder<TProperty> IsUtc<TProperty>(this PropertyBuilder<TProperty> builder, Boolean isUtc = true) =>
          builder.HasAnnotation(IsUtcAnnotation, isUtc);

        public static Boolean IsUtc(this IMutableProperty property) =>
          ((Boolean?)property.FindAnnotation(IsUtcAnnotation)?.Value) ?? true;

        public static void ApplyUtcDateTimeConverter(this ModelBuilder builder) {
            foreach (var entityType in builder.Model.GetEntityTypes()) {
                foreach (var property in entityType.GetProperties()) {
                    if (!property.IsUtc()) {
                        continue;
                    }

                    if (property.ClrType == typeof(DateTime)) {
                        property.SetValueConverter(UtcConverter);
                    }

                    if (property.ClrType == typeof(DateTime?)) {
                        property.SetValueConverter(UtcNullableConverter);
                    }
                }
            }
        }
    }
}