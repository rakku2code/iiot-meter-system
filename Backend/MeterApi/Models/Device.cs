using System.ComponentModel.DataAnnotations;

namespace MeterApi.Models
{
    public class Device
    {
        [Key]
        public int Id {get; set;}

        [Required]
        public string DeviceName {get; set;} = string.Empty;

        public string ProductType {get; set;} = string.Empty;

        public string IpAddress {get; set;} = string.Empty;

        public int Port {get; set;} = 502;
        
        public byte SlaveId {get; set;} = 1;
    }
}