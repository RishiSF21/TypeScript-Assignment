using LibraryManagement.Data;
using MetroAPI.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagement.Controllers{

    [Route("api/[controller]")]
    [ApiController]

    public class BorrowDetailsController: ControllerBase{
        private readonly ApplicationDBContext _dbContext;
        public BorrowDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        // GET : /api/Contacts
        [HttpGet]
        public IActionResult GetBorrow(){
            return Ok(_dbContext.borrowinfo.ToList());
        }

        // GET : /api/Contacts/1
        [HttpGet("{id}")]
        public IActionResult GetBorrow(int id){
            var borrow = _dbContext.borrowinfo.FirstOrDefault(m => m.BorrowID == id);
            if(borrow==null){
                return NotFound();
            }
            return Ok(borrow);
        }

        //POST: api/Contacts
        [HttpPost]
        public IActionResult PostBorrow([FromBody] BorrowDetailsData borrows){
            _dbContext.borrowinfo.Add(borrows);
            //must do a response for any method
            _dbContext.SaveChanges();
            return Ok();
        }

        //Update 
        //POST: api/Contacts/1
        [HttpPut("{id}")]
        public IActionResult PutBorrow(int id, [FromBody] BorrowDetailsData borrows){
            var index = _dbContext.borrowinfo.FirstOrDefault(m=>m.BorrowID ==id);
            if(index==null){
                return NotFound(); 
            }
            index.BorrowID = borrows.BorrowID;
            index.BookID = borrows.BookID;
            index.UserID = borrows.UserID;
            index.BorrowedDate = borrows.BorrowedDate;
            index.BorrowBookCount = borrows.BorrowBookCount;
            index.Status = borrows.Status;
            index.PaidFineAmount = borrows.PaidFineAmount;
            // _Users[index] = users;
            _dbContext.SaveChanges();
            return Ok();
        }

        //Delete
        //Delete: api/Contacts/1
        [HttpDelete("{id}")]
        public IActionResult DeleteBorrow(int id){
             var borrow = _dbContext.borrowinfo.FirstOrDefault(m=>m.BorrowID == id);
            if(borrow == null){
                return NotFound(); 
            }
            _dbContext.borrowinfo.Remove(borrow);
            _dbContext.SaveChanges();
            // _Users.Remove(user);
            return Ok();
        }
    }
}