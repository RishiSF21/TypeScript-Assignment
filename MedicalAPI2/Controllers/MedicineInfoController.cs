using MetroAPI.Controllers;
using Microsoft.AspNetCore.Mvc;
namespace MedicalAPI2.Controllers{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicineInfoController: ControllerBase{
        private readonly ApplicationDBContext _dbContext;
        public MedicineInfoController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }
        // private static List<MedicineInfoData> _Medicines = new List<MedicineInfoData>
        // {
        //     new MedicineInfoData{MedicineID = 201,MedicineName="Paracetemol",MedicineCount=5,MedicinePrice=50,ExpiryDate="2024-05-21"},
        //     new MedicineInfoData{MedicineID = 202,MedicineName="Colpal",MedicineCount=5,MedicinePrice=60,ExpiryDate="2024-04-19"},
        //     new MedicineInfoData{MedicineID = 203,MedicineName="Stepsil",MedicineCount=5,MedicinePrice=70,ExpiryDate="2024-05-05"},
        //     new MedicineInfoData{MedicineID = 204,MedicineName="Iodex",MedicineCount=5,MedicinePrice=80,ExpiryDate="2024-08-21"},
        //     new MedicineInfoData{MedicineID = 205,MedicineName="Acetherol",MedicineCount=5,MedicinePrice=100,ExpiryDate="2025-02-01"}
        // };

        // GET : /api/Contacts
        [HttpGet]
        public IActionResult GetContact(){
            return Ok(_dbContext.medicineinfo.ToList());
        }

        // GET : /api/Contacts/1
        [HttpGet("{id}")]
        public IActionResult GetContact(int id){
            var contact = _dbContext.medicineinfo.FirstOrDefault(m => m.MedicineID == id);
            if(contact==null){
                return NotFound();
            }
            return Ok(contact);
        }

        // Addingnew medicine
        //POST: api/Contacts
        [HttpPost]
        public IActionResult PostContact([FromBody] MedicineInfoData medicine){
            _dbContext.medicineinfo.Add(medicine);
            //must do a response for any method
            _dbContext.SaveChanges();
            return Ok();
        }

        //Update 
        //POST: api/Contacts/1
        [HttpPut("{id}")]
        public IActionResult PutContact(int id, [FromBody] MedicineInfoData medicine){
            var index = _dbContext.medicineinfo.FirstOrDefault(m=>m.MedicineID ==id);
            if(index==null){
                return NotFound(); 
            }
            index.MedicineID = medicine.MedicineID;
            index.MedicineName = medicine.MedicineName;
            index.MedicineCount = medicine.MedicineCount;
            index.MedicinePrice = medicine.MedicinePrice;
            index.ExpiryDate = medicine.ExpiryDate;
            _dbContext.SaveChanges();
            return Ok();
        }

                //Delete
        //Delete: api/Contacts/1
        [HttpDelete("{id}")]
        public IActionResult DeleteContact(int id){
             var contact = _dbContext.medicineinfo.FirstOrDefault(m=>m.MedicineID == id);
            if(contact == null){
                return NotFound(); 
            }
            _dbContext.medicineinfo.Remove(contact);
            return Ok();
        }
    }
}