using Microsoft.AspNetCore.Mvc;

namespace MetroAPI.Controllers{

    [Route("api/[controller]")]
    [ApiController]

    public class HistoryController: ControllerBase{
        private readonly ApplicationDBContext _dbContext;
        public HistoryController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }
        // private static List<TravelHistoryDetailsData> _History = new List<TravelHistoryDetailsData>
        // {
        //     new TravelHistoryDetailsData{TravelID = 201, CardNumber = 101, FromLocation = "Airport", ToLocation = "Egmore", DateOfTravel = new DateTime(2023,10,10), TravelCost = 55},
        //     new TravelHistoryDetailsData{TravelID = 202, CardNumber = 102, FromLocation = "Alandur", ToLocation = "Koyembedu", DateOfTravel = new DateTime(2023,11,10), TravelCost = 25},
        // };

        // GET : /api/History
        [HttpGet]
        public IActionResult GetHistory(){
            return Ok(_dbContext.history.ToList());
        }

        // GET : /api/History/1
        [HttpGet("{id}")]
        public IActionResult GetHistory(int id){
            var history = _dbContext.history.FirstOrDefault(m => m.TravelID== id);
            if(history==null){
                return NotFound();
            }
            return Ok(history);
        }

        //POST: api/History
        [HttpPost]
        public IActionResult PostHistory([FromBody] TravelHistoryDetailsData travelHistory){
            _dbContext.history.Add(travelHistory);
            //must do a response for any method
            _dbContext.SaveChanges();
            return Ok();
        }

        //Update
        //POST: api/History/1
        [HttpPut("{id}")]
        public IActionResult PutHistory(int id, [FromBody] TravelHistoryDetailsData travelHistory){
            var index = _dbContext.history.FirstOrDefault(m => m.TravelID == id);
            if(index==null){
                return NotFound();
            }
            index.CardNumber = travelHistory.CardNumber;
            index.FromLocation = travelHistory.FromLocation;
            index.ToLocation = travelHistory.ToLocation;
            index.DateOfTravel = travelHistory.DateOfTravel;
            index.TravelCost = travelHistory.TravelCost;
            return Ok();
        }

        //Delete
        //Delete: api/History/1
        [HttpDelete("{id}")]
        public IActionResult DeleteHistory(int id){
            var history = _dbContext.history.FirstOrDefault(m=>m.TravelID == id);
            if(history == null){
                return NotFound();
            }
           _dbContext.history.Remove(history);
           _dbContext.SaveChanges();
            return Ok();
        }
    }

}