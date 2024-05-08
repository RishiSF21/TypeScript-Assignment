using LibraryManagement.Data;
using MetroAPI.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagement.Controllers{

    [Route("api/[controller]")]
    [ApiController]

    public class UserDetailsController: ControllerBase{
        private readonly ApplicationDBContext _dbContext;
        public UserDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        // GET : /api/Contacts
        [HttpGet]
        public IActionResult GetUsers(){
            return Ok(_dbContext.usersinfo.ToList());
        }

        // GET : /api/Contacts/1
        [HttpGet("{id}")]
        public IActionResult GetUsers(int id){
            var user = _dbContext.usersinfo.FirstOrDefault(m => m.UserID == id);
            if(user==null){
                return NotFound();
            }
            return Ok(user);
        }

        //POST: api/Contacts
        [HttpPost]
        public IActionResult PostUsers([FromBody] UserDetailsData users){
            _dbContext.usersinfo.Add(users);
            //must do a response for any method
            _dbContext.SaveChanges();
            return Ok();
        }

        //Update 
        //POST: api/Contacts/1
        [HttpPut("{id}")]
        public IActionResult PutUser(int id, [FromBody] UserDetailsData users){
            var index = _dbContext.usersinfo.FirstOrDefault(m=>m.UserID ==id);
            if(index==null){
                return NotFound(); 
            }
            index.UserID = users.UserID;
            index.UserName = users.UserName;
            index.Gender = users.Gender;
            index.Department = users.Department;
            index.MobileNumber = users.MobileNumber;
            index.MailID = users.MailID;
            index.WalletBalance = users.WalletBalance;
            // _Users[index] = users;
            _dbContext.SaveChanges();
            return Ok();
        }

        //Delete
        //Delete: api/Contacts/1
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id){
             var user = _dbContext.usersinfo.FirstOrDefault(m=>m.UserID == id);
            if(user == null){
                return NotFound(); 
            }
            _dbContext.usersinfo.Remove(user);
            _dbContext.SaveChanges();
            // _Users.Remove(user);
            return Ok();
        }
    }
}