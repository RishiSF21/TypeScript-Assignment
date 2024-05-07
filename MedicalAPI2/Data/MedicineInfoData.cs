using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace MedicalAPI2.Controllers;

[Table("MedicineInfoData", Schema = "public")]
public class MedicineInfoData{
    [Key]
    public int MedicineID { get; set; }
    public string MedicineName { get; set; }
    public int MedicineCount { get; set; }
    public int MedicinePrice { get; set; }
    public string ExpiryDate { get; set; }
}