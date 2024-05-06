using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace MetroAPI.Controllers;

[Table("UserDetailsData", Schema = "public")]
public class UserDetailsData{
    // CardNumber: string
    // UserName: string
    // Email: string
    // Password: string
    // PhoneNo: number
    // Balance: number
    [Key]
    public int CardNumber { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Password  { get; set; }
    public long PhoneNo { get; set; }
    public int Balance  { get; set; }

    // public UsersData(string uname, string mail, string pass, long phone){
    //     s_cardNumber++;
    //     CardNumber = "CMRL" + s_cardNumber;

    //     UserName = uname;
    //     Email = mail;
    //     Password = pass;
    //     PhoneNo = phone;
    //     Balance = 200;
    // }
}