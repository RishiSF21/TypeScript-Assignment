using LibraryManagement.Data;
using Microsoft.EntityFrameworkCore;
namespace MetroAPI.Controllers;
public class ApplicationDBContext : DbContext
{
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    public DbSet<UserDetailsData> usersinfo {get; set;}
    public DbSet<BookDetailsData> bookinfo {get; set;}
    public DbSet<BorrowDetailsData> borrowinfo {get; set;}
}