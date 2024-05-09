using MetroAPI.Controllers;
using Microsoft.AspNetCore.Mvc;
namespace GroceryStoreAPI{
    [Route("api/[controller]")]
    [ApiController]

    public class PurchaseDetailsController: ControllerBase{
        private readonly ApplicationDBContext _dbContext;
        public PurchaseDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetPurchase(){
            return Ok(_dbContext.purchaseinfo.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetPurchase(int id){
            var customer = _dbContext.purchaseinfo.FirstOrDefault(m => m.PurchaseID == id);
            if(customer==null){
                return NotFound();
            }
            return Ok(customer);
        }

        [HttpPost]
        public IActionResult PostContact([FromBody] PurchaseDetailsData data){
            _dbContext.purchaseinfo.Add(data);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutPurchase(int id, [FromBody] PurchaseDetailsData data){
            var index = _dbContext.purchaseinfo.FirstOrDefault(m=>m.PurchaseID ==id);
            if(index==null){
                return NotFound(); 
            }
            index.CustomerID = data.CustomerID;
            index.TotalPrice = data.TotalPrice;
            index.PurchaseDate = data.PurchaseDate;
            index.Status = data.Status;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePurchase(int id){
             var custom = _dbContext.purchaseinfo.FirstOrDefault(m=>m.PurchaseID ==id);
            if(custom == null){
                return NotFound(); 
            }
            _dbContext.purchaseinfo.Remove(custom);
            return Ok();
        }
    }
}