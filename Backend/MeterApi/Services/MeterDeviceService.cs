using System;
using System.Net.Sockets;
using NModbus;

namespace MeterApi.Services
{
    public class MeterDeviceService : IDeviceService
    {
        public async Task<double> ReadDataAsync(string ip, int port, byte slaveId)
        {
            using var client = new TcpClient();
            await client.ConnectAsync(ip, port);

            var factory = new ModbusFactory();
            var master = factory.CreateMaster(client);

            ushort startAddress = 0;
            ushort numRegisters = 1;

            ushort[] registers = await master.ReadHoldingRegistersAsync(slaveId, startAddress, numRegisters);

            return (double)registers[0];
        }
    }
}