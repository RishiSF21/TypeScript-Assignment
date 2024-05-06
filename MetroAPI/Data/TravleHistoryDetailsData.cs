using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace MetroAPI.Controllers;

public class TravelHistoryDetailsData{
    [Key]
    public int TravelID { get; set; }
    public int CardNumber { get; set; }

    public string FromLocation { get; set; }
    public string ToLocation { get; set; }
    public DateTime DateOfTravel { get; set; }
    public int TravelCost { get; set; }
}