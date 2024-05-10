using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace GroceryStoreAPI;

[Table("CartItems", Schema = "public")]
public class CartItems{
    [Key]
    public int CartID { get; set; }
    public int PurchaseID { get; set; }
    public int ProductID { get; set; }
    public string ProductName { get; set; }
    public int Price { get; set; }
}