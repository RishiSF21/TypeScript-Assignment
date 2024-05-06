using Microsoft.AspNetCore.Mvc;

namespace MetroAPI.Controllers{

    [Route("api/[controller]")]
    [ApiController]

    public class UsersController: ControllerBase{
        private readonly ApplicationDBContext _dbContext;
        public UsersController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        // private static List<UserDetailsData> _Users = new List<UserDetailsData>
        // {
        //     new UserDetailsData{CardNumber = 101, UserName = "Rishi", Email = "rishi@gmail.com",Password = "rishi",PhoneNo = 7397688707, Balance=100},
        //     new UserDetailsData{CardNumber = 102, UserName = "Parkavi", Email = "paru@gmail.com",Password = "parkavi",PhoneNo = 6852088707, Balance=200}
        // };

        // GET : /api/Contacts
        [HttpGet]
        public IActionResult GetUsers(){
            return Ok(_dbContext.users.ToList());
        }

        // GET : /api/Contacts/1
        [HttpGet("{id}")]
        public IActionResult GetUsers(int id){
            var user = _dbContext.users.FirstOrDefault(m => m.CardNumber == id);
            if(user==null){
                return NotFound();
            }
            return Ok(user);
        }

        //POST: api/Contacts
        [HttpPost]
        public IActionResult PostUsers([FromBody] UserDetailsData users){
            _dbContext.users.Add(users);
            //must do a response for any method
            _dbContext.SaveChanges();
            return Ok();
        }

        //Update 
        //POST: api/Contacts/1
        [HttpPut("{id}")]
        public IActionResult PutUser(int id, [FromBody] UserDetailsData users){
            var index = _dbContext.users.FirstOrDefault(m=>m.CardNumber ==id);
            if(index==null){
                return NotFound(); 
            }
            index.UserName = users.UserName;
            index.Email = users.Email;
            index.Password = users.Password;
            index.PhoneNo = users.PhoneNo;
            index.Balance = users.Balance;
            // _Users[index] = users;
            _dbContext.SaveChanges();
            return Ok();
        }

        //Delete
        //Delete: api/Contacts/1
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id){
             var user = _dbContext.users.FirstOrDefault(m=>m.CardNumber == id);
            if(user == null){
                return NotFound(); 
            }
            _dbContext.users.Remove(user);
            _dbContext.SaveChanges();
            // _Users.Remove(user);
            return Ok();
        }

    }
}