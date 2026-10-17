using Microsoft.AspNetCore.Mvc;
using MeterApi.Services;

namespace MeterApi.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class DevicesController : ControllerBase
    {
        private readonly IDeviceService _deviceService;

        public DevicesController(IDeviceService deviceService)
        {
            _deviceService = deviceService;
        }

        [HttpGet("read/{id}")]
        public async Task<IActionResult> GetDeviceData(int id)
        {
            try
            {
                double value = await _deviceService.ReadDataAsync("127.0.0.1", 502, 1);

                return Ok(new 
                {
                    DeviceId = id,
                    Value = value,
                    Status = "Normal",
                    Timestamp = DateTime.Now
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}