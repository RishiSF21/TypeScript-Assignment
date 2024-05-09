using GroceryStoreAPI;
using Microsoft.EntityFrameworkCore;
namespace MetroAPI.Controllers;
public class ApplicationDBContext : DbContext
{
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    public DbSet<CustomerDetailsData> customersinfo {get; set;}
    public DbSet<ProductData> productinfo {get; set;}
    public DbSet<PurchaseDetailsData> purchaseinfo {get; set;}
}