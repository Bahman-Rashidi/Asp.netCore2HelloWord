using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DAL.Model
{
 

    public partial class MultiLayerCoreContext : DbContext
    {
        public MultiLayerCoreContext()
        {
        }

        public MultiLayerCoreContext(DbContextOptions<MultiLayerCoreContext> options)
            : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=.;Initial Catalog=AspCoreCodeFirst;User ID=sa;Password=12345;");

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.0-rtm-35687");
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");
                entity.Property(e => e.Id).HasColumnName("Id");
            
                entity.Property(e => e.Name)
                  .HasColumnName("name")
                  .HasMaxLength(50);
                entity.Property(e => e.Email)
                  .HasColumnName("email")
                  .HasMaxLength(50);

                entity.Property(e => e.Address)
                   .HasColumnName("Address")
                   .HasMaxLength(500);
            });




        }
    }

}
