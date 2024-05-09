using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace GroceryStoreAPI;

[Table("CustomerDetailsData", Schema = "public")]
public class CustomerDetailsData{
    [Key]
    public int CustomerID { get; set;}
    public string Name { get; set; }
    public string Gender { get; set; }
    public string Mobile { get; set; }
    public string MailID { get; set; }
    public string Password { get; set; }
    public byte[] Image { get; set; }
}