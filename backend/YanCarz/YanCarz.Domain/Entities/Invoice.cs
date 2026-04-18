namespace YanCarz.Domain.Entities
{
    public class Invoice : Base
    {
        public Guid PaymentId { get; set; }

        public DateTime Date { get; set; }
    }
}