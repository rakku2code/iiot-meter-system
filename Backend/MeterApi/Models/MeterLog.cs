using System;
using System.ComponentModel.DataAnnotations;

namespace MeterApi.Models
{
    public class MeterLog
    {
        [Key]
        public int Id {get; set;}

        public int DeviceId {get; set;}

        public double Value {get; set;}

        public string Status {get; set;} = "Normal";
        public DateTime Timestamp {get; set;} = DateTime.Now;
    }
}