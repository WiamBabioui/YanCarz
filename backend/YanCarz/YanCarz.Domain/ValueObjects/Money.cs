namespace YanCarz.Domain.ValueObjects
{
    public class Money
    {
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "MAD";
    }
}