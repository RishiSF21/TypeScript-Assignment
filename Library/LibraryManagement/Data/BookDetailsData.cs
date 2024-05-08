using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace LibraryManagement.Data;
[Table("BookDetailsData", Schema = "public")]
public class BookDetailsData{
    [Key]
    public int BookID { get; set; }
    public string BookName { get; set; }
    public string AuthorName { get; set; }
    public int BookCount { get; set; }
}