// ================================================
// FileName:        AppDbContext.cs
// Project:         Restaurant Booking System
// Namespace:       RestaurantApi.Shared.Data
// Description:     Entity Framework Core database context for the restaurant booking system.
// Created:         22/04/2026
// Modified:        22/04/2026
// API Version:     v1.0.0
// Author:          Deviprasad Rai P (deviprasadr@ccsym.com)
// Last Modified:   Deviprasad Rai P (deviprasadr@ccsym.com)
// ================================================


using Microsoft.EntityFrameworkCore;
using RestaurantApi.AppointmentBooking.Models;
using RestaurantApi.Auth.Constants;
using RestaurantApi.Auth.Models;
using RestaurantApi.Conversation.Models;
using RestaurantApi.Menu.Models;
using RestaurantApi.Table.Models;
using System.Text.Json;

namespace RestaurantApi.Shared.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<MenuCategory> MenuCategories => Set<MenuCategory>();
    public DbSet<MenuItem> MenuItems => Set<MenuItem>();
    public DbSet<RestaurantTable> Tables => Set<RestaurantTable>();
    public DbSet<AppointmentDetails> Appointments => Set<AppointmentDetails>();
    public DbSet<CallSession> CallSessions => Set<CallSession>();

    protected override void OnModelCreating(ModelBuilder mb)
    {
        // ── MenuItem ─────────────────────────────────────────────────────────
        mb.Entity<MenuItem>(e =>
        {
            e.Property(x => x.Price).HasColumnType("decimal(10,2)");
            e.HasOne(x => x.Category)
             .WithMany(c => c.Items)
             .HasForeignKey(x => x.CategoryId)
             .OnDelete(DeleteBehavior.Restrict);
        });

        // ── Appointment ───────────────────────────────────────────────────────
        mb.Entity<AppointmentDetails>(e =>
        {
            e.Property(x => x.Status).HasConversion<string>();
            e.Property(x => x.Source).HasConversion<string>();
            e.HasIndex(x => new { x.AppointmentDate, x.Status });
            e.HasIndex(x => x.CustomerPhone);
            e.HasOne(x => x.Table)
             .WithMany(t => t.Appointments)
             .HasForeignKey(x => x.TableId)
             .OnDelete(DeleteBehavior.SetNull);
        });

        // ── CallSession ───────────────────────────────────────────────────────
        mb.Entity<CallSession>(e =>
        {
            e.Property(x => x.Status).HasConversion<string>();
            e.HasIndex(x => x.SessionId).IsUnique();
            e.Property(x => x.Turns)
             .HasConversion(
                 v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                 v => JsonSerializer.Deserialize<List<ConversationTurn>>(v, (JsonSerializerOptions?)null) ?? new());
        });

        // ── User ──────────────────────────────────────────────────────────────
        mb.Entity<User>(e =>
        {
            e.HasIndex(x => x.Username).IsUnique();
            e.HasIndex(x => x.Email).IsUnique();
        });

        Seed(mb);
    }

    // ─────────────────────────────────────────────────────────────────────────

    private static void Seed(ModelBuilder mb)
    {
        // Default admin  (password: Admin@1234)
        mb.Entity<User>().HasData(new User
        {
            Id = 1,
            Username = "admin",
            PasswordHash = "$2a$11$Mije7HNX.l./XOVNJvCeeeuDsTJswjsfEB4pphar0AZwNdqDsA43e",
            Email = "admin@restaurant.com",
            Role = Roles.Admin,
            IsActive = true,
            CreatedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            UpdatedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc)
        });

        // Default staff
        mb.Entity<User>().HasData(new User
        {
            Id = 2,
            Username = "staff",
            PasswordHash = "$2a$11$Mije7HNX.l./XOVNJvCeeeuDsTJswjsfEB4pphar0AZwNdqDsA43e",
            Email = "staff@restaurant.com",
            Role = Roles.Staff,
            IsActive = true,
            CreatedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            UpdatedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc)
        });

        // Categories
        mb.Entity<MenuCategory>().HasData(
            new MenuCategory { Id = 1, Name = "Starters", Description = "Light bites to begin your meal", DisplayOrder = 1, CreatedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new MenuCategory { Id = 2, Name = "Mains", Description = "Hearty main courses", DisplayOrder = 2, CreatedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new MenuCategory { Id = 3, Name = "Desserts", Description = "Sweet endings to your experience", DisplayOrder = 3, CreatedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new MenuCategory { Id = 4, Name = "Beverages", Description = "Curated drinks and cocktails", DisplayOrder = 4, CreatedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) }
        );

        var now = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        // Menu items
        mb.Entity<MenuItem>().HasData(
            new MenuItem { Id = 1, CategoryId = 1, Name = "Bruschetta al Pomodoro", Description = "Toasted sourdough, vine tomatoes, garlic, fresh basil, EVOO", Price = 8.50m, ImageUrl = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800", IsVegetarian = true, IsVegan = true, IsGlutenFree = false, CreatedAt = now, UpdatedAt = now },
            new MenuItem { Id = 2, CategoryId = 1, Name = "Calamari Fritti", Description = "Crispy squid with house aioli and charred lemon", Price = 13.50m, ImageUrl = "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800", IsVegetarian = false, IsVegan = false, IsGlutenFree = false, Allergens = "Seafood, Gluten", CreatedAt = now, UpdatedAt = now },
            new MenuItem { Id = 3, CategoryId = 1, Name = "Caprese Salad", Description = "Buffalo mozzarella, heritage tomatoes, basil oil, sea salt", Price = 11.00m, ImageUrl = "https://images.unsplash.com/photo-1544025162-d76694265947?w=800", IsVegetarian = true, IsVegan = false, IsGlutenFree = true, Allergens = "Dairy", CreatedAt = now, UpdatedAt = now },
            new MenuItem { Id = 4, CategoryId = 1, Name = "Burrata", Description = "Creamy burrata with prosciutto and fig preserve", Price = 14.00m, ImageUrl = "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800", IsVegetarian = false, IsVegan = false, IsGlutenFree = true, Allergens = "Dairy", CreatedAt = now, UpdatedAt = now },
            new MenuItem { Id = 5, CategoryId = 2, Name = "Atlantic Grilled Salmon", Description = "Pan-seared salmon fillet, wilted spinach, lemon beurre blanc", Price = 27.00m, ImageUrl = "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800", IsVegetarian = false, IsVegan = false, IsGlutenFree = true, Allergens = "Fish, Dairy", CreatedAt = now, UpdatedAt = now },
            new MenuItem { Id = 6, CategoryId = 2, Name = "Beef Tenderloin 200g", Description = "Grain-fed tenderloin, truffle mash, asparagus, red wine jus", Price = 42.00m, ImageUrl = "https://images.unsplash.com/photo-1544025162-d76694265947?w=800", IsVegetarian = false, IsVegan = false, IsGlutenFree = true, CreatedAt = now, UpdatedAt = now },
            new MenuItem { Id = 7, CategoryId = 2, Name = "Wild Mushroom Risotto", Description = "Arborio rice, porcini, parmesan crisp, truffle oil", Price = 19.00m, ImageUrl = "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800", IsVegetarian = true, IsVegan = false, IsGlutenFree = true, Allergens = "Dairy", CreatedAt = now, UpdatedAt = now },
            new MenuItem { Id = 8, CategoryId = 2, Name = "Chicken Milanese", Description = "Breaded free-range chicken, rocket, parmesan, cherry tomatoes", Price = 23.00m, ImageUrl = "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800", IsVegetarian = false, IsVegan = false, IsGlutenFree = false, Allergens = "Gluten, Dairy, Eggs", CreatedAt = now, UpdatedAt = now },
            new MenuItem { Id = 9, CategoryId = 3, Name = "Classic Tiramisu", Description = "Espresso-soaked ladyfingers, mascarpone, dark cocoa", Price = 9.50m, ImageUrl = "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800", IsVegetarian = true, IsVegan = false, IsGlutenFree = false, Allergens = "Dairy, Eggs, Gluten", CreatedAt = now, UpdatedAt = now },
            new MenuItem { Id = 10, CategoryId = 3, Name = "Panna Cotta", Description = "Vanilla bean cream, strawberry coulis, fresh mint", Price = 8.50m, ImageUrl = "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800", IsVegetarian = true, IsVegan = false, IsGlutenFree = true, Allergens = "Dairy", CreatedAt = now, UpdatedAt = now },
            new MenuItem { Id = 11, CategoryId = 3, Name = "Chocolate Fondant", Description = "Warm dark chocolate lava cake, vanilla gelato", Price = 10.50m, ImageUrl = "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800", IsVegetarian = true, IsVegan = false, IsGlutenFree = false, Allergens = "Dairy, Eggs, Gluten", CreatedAt = now, UpdatedAt = now },
            new MenuItem { Id = 12, CategoryId = 4, Name = "House Chianti (Glass)", Description = "Ruffino Chianti Classico DOCG, 150ml", Price = 10.00m, ImageUrl = "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800", CreatedAt = now, UpdatedAt = now },
            new MenuItem { Id = 13, CategoryId = 4, Name = "Aperol Spritz", Description = "Aperol, Prosecco, soda, orange slice", Price = 11.00m, ImageUrl = "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800", IsVegetarian = true, IsVegan = true, CreatedAt = now, UpdatedAt = now },
            new MenuItem { Id = 14, CategoryId = 4, Name = "San Pellegrino 500ml", Description = "Still or sparkling", Price = 4.50m, ImageUrl = "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=800", IsVegetarian = true, IsVegan = true, IsGlutenFree = true, CreatedAt = now, UpdatedAt = now },
            new MenuItem { Id = 15, CategoryId = 4, Name = "Fresh-Pressed Juice", Description = "Orange, watermelon, or green apple", Price = 6.00m, ImageUrl = "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800", IsVegetarian = true, IsVegan = true, IsGlutenFree = true, CreatedAt = now, UpdatedAt = now }
        );

        // Tables
        mb.Entity<RestaurantTable>().HasData(
            new RestaurantTable { Id = 1, TableNumber = "T01", Capacity = 2, Location = "Main Hall", IsActive = true, CreatedAt = now },
            new RestaurantTable { Id = 2, TableNumber = "T02", Capacity = 2, Location = "Main Hall", IsActive = true, CreatedAt = now },
            new RestaurantTable { Id = 3, TableNumber = "T03", Capacity = 4, Location = "Main Hall", IsActive = true, CreatedAt = now },
            new RestaurantTable { Id = 4, TableNumber = "T04", Capacity = 4, Location = "Main Hall", IsActive = true, CreatedAt = now },
            new RestaurantTable { Id = 5, TableNumber = "T05", Capacity = 6, Location = "Main Hall", IsActive = true, CreatedAt = now },
            new RestaurantTable { Id = 6, TableNumber = "T06", Capacity = 6, Location = "Main Hall", IsActive = true, CreatedAt = now },
            new RestaurantTable { Id = 7, TableNumber = "T07", Capacity = 4, Location = "Terrace", IsActive = true, CreatedAt = now },
            new RestaurantTable { Id = 8, TableNumber = "T08", Capacity = 4, Location = "Terrace", IsActive = true, CreatedAt = now },
            new RestaurantTable { Id = 9, TableNumber = "T09", Capacity = 6, Location = "Terrace", IsActive = true, CreatedAt = now },
            new RestaurantTable { Id = 10, TableNumber = "P01", Capacity = 8, Location = "Private Room", IsActive = true, CreatedAt = now },
            new RestaurantTable { Id = 11, TableNumber = "P02", Capacity = 10, Location = "Private Room", IsActive = true, CreatedAt = now },
            new RestaurantTable { Id = 12, TableNumber = "P03", Capacity = 14, Location = "Private Room", IsActive = true, CreatedAt = now }
        );
    }
}