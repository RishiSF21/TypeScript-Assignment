using MetroAPI.Controllers;
using Microsoft.AspNetCore.Mvc;
namespace GroceryStoreAPI{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerDetailsController: ControllerBase{
        private readonly ApplicationDBContext _dbContext;
        public CustomerDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetUsers(){
            return Ok(_dbContext.customersinfo.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetContact(int id){
            var customer = _dbContext.customersinfo.FirstOrDefault(m => m.CustomerID == id);
            if(customer==null){
                return NotFound();
            }
            return Ok(customer);
        }

        [HttpPost]
        public IActionResult PostContact([FromBody] CustomerDetailsData customer1){
            _dbContext.customersinfo.Add(customer1);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutContact(int id, [FromBody] CustomerDetailsData customer1){
            var index = _dbContext.customersinfo.FirstOrDefault(m=>m.CustomerID ==id);
            if(index==null){
                return NotFound(); 
            }
            index.Name = customer1.Name;
            index.Gender = customer1.Gender;
            index.Mobile = customer1.Mobile;
            index.MailID = customer1.MailID;
            index.Password = customer1.Password;
            index.Image = customer1.Image;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteContact(int id){
             var custom = _dbContext.customersinfo.FirstOrDefault(m=>m.CustomerID ==id);
            if(custom == null){
                return NotFound(); 
            }
            _dbContext.customersinfo.Remove(custom);
            return Ok();
        }
    }
}