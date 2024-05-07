using MetroAPI.Controllers;
using Microsoft.AspNetCore.Mvc;
namespace MedicalAPI2.Controllers{
    [Route("api/[controller]")]
    [ApiController]

    public class OrderController: ControllerBase{
        private readonly ApplicationDBContext _dbContext;
        public OrderController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }
        // private static List<OrderData> _Orders = new List<OrderData>
        // {
        //     new OrderData{OrderID=301,MedicineID=202,UserID=101,MedicineName="Colpal",MedicineCount=2,TotalPrice=120,Status="Ordered"},
        //     new OrderData{OrderID=302,MedicineID=204,UserID=101,MedicineName="Iodex",MedicineCount=3,TotalPrice=240,Status="Ordered"},
        // };

        // GET : /api/Contacts
        [HttpGet]
        public IActionResult GetContact(){
            return Ok(_dbContext.ordersinfo.ToList());
        }

        // GET : /api/Contacts/1
        [HttpGet("{id}")]
        public IActionResult GetContact(int id){
            var contact = _dbContext.ordersinfo.FirstOrDefault(m => m.OrderID == id);
            if(contact==null){
                return NotFound();
            }
            return Ok(contact);
        }

        // Addingnew medicine
        //POST: api/Contacts
        [HttpPost]
        public IActionResult PostContact([FromBody] OrderData order){
            _dbContext.ordersinfo.Add(order);
            //must do a response for any method
            _dbContext.SaveChanges();
            return Ok();
        }

                //Update 
        //POST: api/Contacts/1
        [HttpPut("{id}")]
        public IActionResult PutContact(int id, [FromBody] OrderData order){
            var index = _dbContext.ordersinfo.FirstOrDefault(m=>m.OrderID ==id);
            if(index==null){
                return NotFound(); 
            }
            index.OrderID = order.OrderID;
            index.MedicineID = order.MedicineID;
            index.UserID = order.UserID;
            index.MedicineName = order.MedicineName;
            index.MedicineCount = order.MedicineCount;
            index.TotalPrice = order.TotalPrice;
            index.Status = order.Status;
            _dbContext.SaveChanges();
            return Ok();
        }

        //Delete: api/Contacts/1
        [HttpDelete("{id}")]
        public IActionResult DeleteContact(int id){
             var contact = _dbContext.ordersinfo.FirstOrDefault(m=>m.OrderID ==id);
            if(contact == null){
                return NotFound(); 
            }
            _dbContext.ordersinfo.Remove(contact);
            return Ok();
        }
    }
}