using MetroAPI.Controllers;
using Microsoft.AspNetCore.Mvc;
namespace MedicalAPI2.Controllers{
    [Route("api/[controller]")]
    [ApiController]

    public class UserController: ControllerBase{
        private readonly ApplicationDBContext _dbContext;
        public UserController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }
        // private static List<UserData> _Users= new List<UserData>    
        // {
        //     new UserData{UserID = 101, UserEmail = "rishi@gmail.com",UserPassword = "rishi", UserPhoneNumber = "7397688707", Balance = 200}
        // };

        // GET : /api/Contacts
        [HttpGet]
        public IActionResult GetUsers(){
            return Ok(_dbContext.users.ToList());
        }

        // GET : /api/Contacts/1
        [HttpGet("{id}")]
        public IActionResult GetContact(int id){
            var contact = _dbContext.users.FirstOrDefault(m => m.UserID == id);
            if(contact==null){
                return NotFound();
            }
            return Ok(contact);
        }

        // Addingnew medicine
        //POST: api/Contacts
        [HttpPost]
        public IActionResult PostContact([FromBody] UserData user){
            _dbContext.users.Add(user);
            //must do a response for any method
            _dbContext.SaveChanges();
            return Ok();
        }

        //Update 
        //POST: api/Contacts/1
        [HttpPut("{id}")]
        public IActionResult PutContact(int id, [FromBody] UserData user){
            var index = _dbContext.users.FirstOrDefault(m=>m.UserID ==id);
            if(index==null){
                return NotFound(); 
            }
            index.UserID = user.UserID;
            index.UserEmail = user.UserEmail;
            index.UserPassword = user.UserPassword;
            index.UserPhoneNumber = user.UserPhoneNumber;
            index.Balance = user.Balance;
            _dbContext.SaveChanges();
            return Ok();
        }

        //Delete
        //Delete: api/Contacts/1
        [HttpDelete("{id}")]
        public IActionResult DeleteContact(int id){
             var contact = _dbContext.users.FirstOrDefault(m=>m.UserID ==id);
            if(contact == null){
                return NotFound(); 
            }
            _dbContext.users.Remove(contact);
            return Ok();
        }
    }
}