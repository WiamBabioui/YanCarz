using Microsoft.EntityFrameworkCore;
using YanCarz.Domain.Entities;

namespace YanCarz.Infrastructure.Data;

public class YanCarzDbContext : DbContext
{
    public YanCarzDbContext(DbContextOptions<YanCarzDbContext> options)
    : base(options)
    {
    }

    public DbSet<Country> Countries { get; set; } = null!;
    public DbSet<City> Cities { get; set; } = null!;
    public DbSet<Place> Places { get; set; } = null!;
    public DbSet<Agency> Agencies { get; set; } = null!;
    public DbSet<AgencyUser> AgencyUsers { get; set; } = null!;
    public DbSet<AgencyCar> AgencyCars { get; set; } = null!;
    public DbSet<Mark> Marks { get; set; } = null!;
    public DbSet<Model> Models { get; set; } = null!;
    public DbSet<User> Users { get; set; }
    public DbSet<Devise> Devises { get; set; }
    public DbSet<ResearchRequest> ResearchRequests { get; set; }
  

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Country>(entity =>
        {
            entity.ToTable("Country");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Name).IsRequired().HasMaxLength(300);
        });

        modelBuilder.Entity<City>(entity =>
        {
            entity.ToTable("City");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Name).IsRequired().HasMaxLength(300);
            entity.HasOne(x => x.Country)
                .WithMany(x => x.Cities)
                .HasForeignKey(x => x.CountryId);
        });

        modelBuilder.Entity<Place>(entity =>
        {
            entity.ToTable("Place");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Name).IsRequired().HasMaxLength(300);
            entity.HasOne(x => x.Country)
                .WithMany()
                .HasForeignKey(x => x.CountryId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Agency>(entity =>
        {
            entity.ToTable("Agency");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Name).IsRequired().HasMaxLength(150);
            entity.OwnsOne(x => x.Address, address =>
            {
                address.Property(a => a.AddressComplte).HasMaxLength(200);
                address.Property(a => a.PostalCode).HasMaxLength(20);
            });
        });

        modelBuilder.Entity<AgencyUser>(entity =>
        {
            entity.ToTable("AgencyUser");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.FirstName).IsRequired().HasMaxLength(80);
            entity.Property(x => x.LastName).IsRequired().HasMaxLength(80);
            entity.Property(x => x.EMail).IsRequired().HasMaxLength(150);
            entity.Property(x => x.PasswordHash).IsRequired().HasMaxLength(500);
            entity.Property(x => x.Telephone).IsRequired().HasMaxLength(30);
            entity.HasIndex(x => x.EMail).IsUnique();
            entity.HasOne(x => x.Agency)
                .WithMany(x => x.AgencyUsers)
                .HasForeignKey(x => x.AgencyId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<AgencyCar>(entity =>
        {
            entity.ToTable("AgencyCar");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Year).IsRequired();
            entity.Property(x => x.PlateNumber).IsRequired().HasMaxLength(50);
            entity.Property(x => x.Color).IsRequired().HasMaxLength(60);
            entity.Property(x => x.FuelType).IsRequired();
            entity.Property(x => x.Seats).IsRequired();
            entity.Property(x => x.PricePerDay).HasColumnType("decimal(18,2)");
            entity.Property(x => x.Status).IsRequired();
            entity.HasOne(x => x.Agency)
                .WithMany(x => x.Cars)
                .HasForeignKey(x => x.AgencyId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(x => x.Model)
                .WithMany()
                .HasForeignKey(x => x.ModelId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasIndex(x => x.PlateNumber).IsUnique();
        });

        modelBuilder.Entity<Mark>(entity =>
        {
            entity.ToTable("Mark");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Name).IsRequired().HasMaxLength(100);
        });

        modelBuilder.Entity<Model>(entity =>
        {
            entity.ToTable("Model");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Name).IsRequired().HasMaxLength(100);
            entity.Property(x => x.TypeModel).IsRequired();
            entity.HasOne(x => x.Mark)
                .WithMany(x => x.Models)
                .HasForeignKey(x => x.MarkId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<ResearchRequest>(entity =>
        {
            entity.ToTable("ResearchRequest");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.DepartureDate).IsRequired();
            entity.Property(x => x.ReturnDate).IsRequired();
            entity.Property(x => x.IdPickupLocation).IsRequired();
            entity.Property(x => x.IdDropOffLocation).IsRequired();

        });


    }
}
