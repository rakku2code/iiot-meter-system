namespace MeterApi.Services
{
    public interface IDeviceService
    {
        Task<double> ReadDataAsync(string ip, int port, byte slaveId);
    }
}