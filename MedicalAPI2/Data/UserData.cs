using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace MedicalAPI2.Controllers;

[Table("UserData", Schema = "public")]
public class UserData{
    [Key]
    public int UserID { get; set; }
    public string UserEmail { get; set; }
    public string UserPassword { get; set; }
    public string UserPhoneNumber { get; set; }
    public double Balance { get; set; }
}