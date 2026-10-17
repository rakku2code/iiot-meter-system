using System;
using System.Threading.Tasks;

namespace MeterApi.Services
{
    public class OtherProductService : IDeviceService
    {
        public async Task<double> ReadDataAsync(string ip, int port, byte slaveId)
        {
            await Task.Delay(100);
            return 999.99;
        }
    }
}