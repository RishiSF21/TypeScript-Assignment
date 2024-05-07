using MedicalAPI2.Controllers;
using Microsoft.EntityFrameworkCore;
namespace MetroAPI.Controllers;
public class ApplicationDBContext : DbContext
{
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    public DbSet<UserData> users {get; set;}
    public DbSet<MedicineInfoData> medicineinfo {get; set;}
    public DbSet<OrderData> ordersinfo {get; set;}
}