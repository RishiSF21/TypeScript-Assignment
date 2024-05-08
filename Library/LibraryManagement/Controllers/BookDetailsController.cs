using LibraryManagement.Data;
using MetroAPI.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagement.Controllers{

    [Route("api/[controller]")]
    [ApiController]

    public class BookDetailsController: ControllerBase{
        private readonly ApplicationDBContext _dbContext;
        public BookDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        // GET : /api/Contacts
        [HttpGet]
        public IActionResult GetBooks(){
            return Ok(_dbContext.bookinfo.ToList());
        }

        // GET : /api/Contacts/1
        [HttpGet("{id}")]
        public IActionResult GetBooks(int id){
            var book = _dbContext.bookinfo.FirstOrDefault(m => m.BookID == id);
            if(book==null){
                return NotFound();
            }
            return Ok(book);
        }

        //POST: api/Contacts
        [HttpPost]
        public IActionResult PostUsers([FromBody] BookDetailsData books){
            _dbContext.bookinfo.Add(books);
            //must do a response for any method
            _dbContext.SaveChanges();
            return Ok();
        }

        //Update 
        //POST: api/Contacts/1
        [HttpPut("{id}")]
        public IActionResult PutUser(int id, [FromBody] BookDetailsData books){
            var index = _dbContext.bookinfo.FirstOrDefault(m=>m.BookID ==id);
            if(index==null){
                return NotFound(); 
            }
            index.BookID = books.BookID;
            index.BookName = books.BookName;
            index.AuthorName = books.AuthorName;
            index.BookCount = books.BookCount;
            // _Users[index] = users;
            _dbContext.SaveChanges();
            return Ok();
        }

        //Delete
        //Delete: api/Contacts/1
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id){
             var book = _dbContext.bookinfo.FirstOrDefault(m=>m.BookID == id);
            if(book == null){
                return NotFound(); 
            }
            _dbContext.bookinfo.Remove(book);
            _dbContext.SaveChanges();
            // _Users.Remove(user);
            return Ok();
        }
    }
}