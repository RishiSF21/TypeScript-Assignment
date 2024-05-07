using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace MedicalAPI2.Controllers;

[Table("OrderData", Schema = "public")]
public class OrderData{
    [Key]
    public int OrderID { get; set; }
    public int MedicineID { get; set; }
    public int UserID { get; set; }
    public string MedicineName { get; set; }
    public int MedicineCount { get; set; }
    public double TotalPrice { get; set; }
    public string Status { get; set; }
}