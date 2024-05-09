using MetroAPI.Controllers;
using Microsoft.AspNetCore.Mvc;
namespace GroceryStoreAPI{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController: ControllerBase{
        private readonly ApplicationDBContext _dbContext;
        public ProductController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetProducts(){
            return Ok(_dbContext.productinfo.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetProducts(int id){
            var customer = _dbContext.productinfo.FirstOrDefault(m => m.ProductID == id);
            if(customer==null){
                return NotFound();
            }
            return Ok(customer);
        }

        [HttpPost]
        public IActionResult PostProduct([FromBody] ProductData prod){
            _dbContext.productinfo.Add(prod);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutProduct(int id, [FromBody] ProductData prod){
            var index = _dbContext.productinfo.FirstOrDefault(m=>m.ProductID ==id);
            if(index==null){
                return NotFound(); 
            }
            index.ProductName = prod.ProductName;
            index.QuantityAvailable = prod.QuantityAvailable;
            index.UnitPrice = prod.UnitPrice;
            index.ExpiryDate = prod.ExpiryDate;
            index.Images = prod.Images;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id){
             var custom = _dbContext.productinfo.FirstOrDefault(m=>m.ProductID ==id);
            if(custom == null){
                return NotFound(); 
            }
            _dbContext.productinfo.Remove(custom);
            return Ok();
        }
    }
}