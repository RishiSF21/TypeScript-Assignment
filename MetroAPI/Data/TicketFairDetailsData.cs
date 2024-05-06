using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace MetroAPI.Controllers;

public class TicketFairDetailsData{
    [Key]
    public int TicketID { get; set; }
    public string FromLocation { get; set; }
    public string ToLocation { get; set; }
    public int Fair { get; set; }
}