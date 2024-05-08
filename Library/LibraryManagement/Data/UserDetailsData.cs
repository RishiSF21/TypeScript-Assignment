using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace LibraryManagement.Data;
[Table("UserDetailsData", Schema = "public")]
public class UserDetailsData{
    [Key]
    public int UserID { get; set; }
    public string UserName { get; set; }
    public string Gender { get; set; }
    public string Department { get; set; }
    public string MobileNumber { get; set; }
    public int WalletBalance { get; set; }
    public string MailID { get; set; }
}