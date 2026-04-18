namespace YanCarz.Domain.ValueObjects
{
    public class Address
    {
        public string AddressComplte { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string? PostalCode { get; set; }
    }
}