using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data {
	public class DataContext : DbContext {
		public DbSet<AppUser> Users { get; set; }
		public DbSet<UserLike> Likes { get; set; }
		public DbSet<Message> Messages { get; set; }

		public DataContext(DbContextOptions options) : base(options) {
		}

		protected override void OnModelCreating(ModelBuilder builder) {
			base.OnModelCreating(builder);

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
		}
	}
}