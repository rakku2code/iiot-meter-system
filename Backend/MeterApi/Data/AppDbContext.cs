using Microsoft.EntityFrameworkCore;
using MeterApi.Models;

namespace MeterApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {}
        public DbSet<MeterLog> MeterLogs { get; set;}
        public DbSet<Device> Devices { get; set;}
    }
}