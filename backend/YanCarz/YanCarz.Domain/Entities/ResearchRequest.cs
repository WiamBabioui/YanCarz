
using System.ComponentModel.DataAnnotations.Schema;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace YanCarz.Domain.Entities
{
    public class ResearchRequest : Base
    {
        public DateTime DepartureDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public string? AddressIP { get; set; }
        public Guid IdPickupLocation { get; set; }
        public Guid IdDropOffLocation { get; set; }
        public Place? PickupLocation { get; private set; }
        public Place? DropOffLocation { get; private set; }

    }
}