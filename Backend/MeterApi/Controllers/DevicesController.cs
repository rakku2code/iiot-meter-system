using Microsoft.AspNetCore.Mvc;
using MeterApi.Services;
using MeterApi.Data;
using MeterApi.Models;

namespace MeterApi.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class DevicesController : ControllerBase
    {
        private readonly IDeviceService _deviceService;
        private readonly AppDbContext _context;

        public DevicesController(IDeviceService deviceService, AppDbContext context)
        {
            _deviceService = deviceService;
            _context = context;
        }

        [HttpGet("read/{id}")]
        public async Task<IActionResult> GetDeviceData(int id)
        {
            try
            {
                double value = await _deviceService.ReadDataAsync("127.0.0.1", 502, 1);

                var log = new MeterLog
                {
                    DeviceId = id,
                    Value = value,
                    Status = "Normal",
                    Timestamp = DateTime.Now
                };

                _context.MeterLogs.Add(log);
                await _context.SaveChangesAsync();

                return Ok(new 
                {
                    DeviceId = id,
                    Value = value,
                    Status = "Normal",
                    Timestamp = log.Timestamp
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}