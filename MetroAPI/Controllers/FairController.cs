using Microsoft.AspNetCore.Mvc;

namespace MetroAPI.Controllers{

    [Route("api/[controller]")]
    [ApiController]

    public class FairController: ControllerBase{
        private readonly ApplicationDBContext _dbContext;
        public FairController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }
        // private static List<TicketFairDetailsData> _Fairs = new List<TicketFairDetailsData>
        // {
        //     new TicketFairDetailsData{TicketID = 301,FromLocation = "Airport",ToLocation = "Egmore", Fair = 55},
        //     new TicketFairDetailsData{TicketID = 302,FromLocation = "Airport",ToLocation = "Koyembedu", Fair = 25},
        //     new TicketFairDetailsData{TicketID = 303,FromLocation = "Alandur",ToLocation = "Koyembedu", Fair = 25},
        //     new TicketFairDetailsData{TicketID = 304,FromLocation = "Koyembedu",ToLocation = "Egmore", Fair = 32},
        //     new TicketFairDetailsData{TicketID = 305,FromLocation = "Vadapalani",ToLocation = "Egmore", Fair = 45},
        //     new TicketFairDetailsData{TicketID = 306,FromLocation = "Arumbakkam",ToLocation = "Egmore", Fair = 25},
        //     new TicketFairDetailsData{TicketID = 307,FromLocation = "Vadapalani",ToLocation = "Koyembedu", Fair = 25},
        //     new TicketFairDetailsData{TicketID = 308,FromLocation = "Arumbakkam",ToLocation = "Koyembedu", Fair = 16}
        // };

        [HttpGet]
        public IActionResult GetFairs(){
            return Ok(_dbContext.fairs.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetFairs(int id){
            var fair = _dbContext.fairs.FirstOrDefault(m => m.TicketID == id);
            if(fair==null){
                return NotFound();
            }
            return Ok(fair);
        }

        //POST: api/Fairs
        [HttpPost]
        public IActionResult PostFairs([FromBody] TicketFairDetailsData fair){
            _dbContext.fairs.Add(fair);
            //must do a response for any method
            _dbContext.SaveChanges();
            return Ok();
        }

        //POST: api/Contacts/1
        [HttpPut("{id}")]
        public IActionResult PutContact(int id, [FromBody] TicketFairDetailsData fair){
            var index = _dbContext.fairs.FirstOrDefault(m=>m.TicketID ==id);
            if(index==null){
                return NotFound(); 
            }
            index.TicketID = fair.TicketID;
            index.FromLocation = fair.FromLocation;
            index.ToLocation = fair.ToLocation;
            index.Fair = fair.Fair;
            _dbContext.SaveChanges();
            return Ok();
        }
        
    }
}