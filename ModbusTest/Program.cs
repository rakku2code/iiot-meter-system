using System;
using System.Net.Sockets;
using NModbus;

class Program
{
    static async Task Main(string[] args)
    {
        string ip = "127.0.0.1";
        int port = 502;

        using var client = new TcpClient();
        await client.ConnectAsync(ip, port);

        var factory = new ModbusFactory();
        var master = factory.CreateMaster(client);

        byte slaveId = 1;
        ushort startAddress = 0;
        ushort numRegisters = 10;

        try
        {
            ushort[] registers = await master.ReadHoldingRegistersAsync(slaveId, startAddress, numRegisters);

            Console.WriteLine("成功連線與讀取 Modbus 數據");
            for (int i = 0; i < registers.Length; i++)
            {
                Console.WriteLine($"Register {startAddress +i}:{registers[i]}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"通訊失敗/無法取得資料:{ex.Message}");
        }
    }
}
