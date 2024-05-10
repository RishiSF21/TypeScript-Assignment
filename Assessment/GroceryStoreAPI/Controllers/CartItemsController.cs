using MetroAPI.Controllers;
using Microsoft.AspNetCore.Mvc;
namespace GroceryStoreAPI{
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemsController: ControllerBase{
        private readonly ApplicationDBContext _dbContext;
        public CartItemsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetCarts(){
            return Ok(_dbContext.cartinfo.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetCarts(int id){
            var customer = _dbContext.cartinfo.FirstOrDefault(m => m.CartID == id);
            if(customer==null){
                return NotFound();
            }
            return Ok(customer);
        }

        [HttpPost]
        public IActionResult PostCart([FromBody] CartItems carts){
            _dbContext.cartinfo.Add(carts);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutCarts(int id, [FromBody] CartItems carts){
            var index = _dbContext.cartinfo.FirstOrDefault(m=>m.CartID ==id);
            if(index==null){
                return NotFound(); 
            }
            index.PurchaseID = carts.PurchaseID;
            index.ProductID = carts.ProductID;
            index.ProductName = carts.ProductName;
            index.Price = carts.Price;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id){
             var custom = _dbContext.cartinfo.FirstOrDefault(m=>m.CartID ==id);
            if(custom == null){
                return NotFound(); 
            }
            _dbContext.cartinfo.Remove(custom);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}