using Microsoft.EntityFrameworkCore;
namespace MetroAPI.Controllers;
public class ApplicationDBContext : DbContext
{
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    public DbSet<UserDetailsData> users {get; set;}
    public DbSet<TravelHistoryDetailsData> history {get; set;}
    public DbSet<TicketFairDetailsData> fairs {get; set;}
}