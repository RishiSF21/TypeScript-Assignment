using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace GroceryStoreAPI;

[Table("PurchaseDetailsData", Schema = "public")]
public class PurchaseDetailsData{
    [Key]
    public int PurchaseID { get; set; }
    public int CustomerID { get; set; }
    public int TotalPrice { get; set; }
    public DateTime PurchaseDate { get; set; }
    public string Status { get; set; }
}