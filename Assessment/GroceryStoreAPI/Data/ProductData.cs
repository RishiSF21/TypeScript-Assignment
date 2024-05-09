using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace GroceryStoreAPI;

[Table("ProductData", Schema = "public")]
public class ProductData{
    [Key]
    public int ProductID { get; set; }
    public string ProductName { get; set; }
    public int QuantityAvailable { get; set; }
    public int UnitPrice { get; set; }
    public DateTime ExpiryDate { get; set; }
    public byte[] Images { get; set; }
}