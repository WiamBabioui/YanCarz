using YanCarz.Domain.ValueObjects; 
using YanCarz.Domain.Enums;        

namespace YanCarz.Domain.Entities
{
    public class Payment : Base
    {
        public Guid BookingId { get; set; }

        public PaymentStatus Status { get; set; }

        public Money Amount { get; set; } = new Money();
    }
}