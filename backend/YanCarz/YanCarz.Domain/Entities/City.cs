using System.ComponentModel.DataAnnotations.Schema;

namespace YanCarz.Domain.Entities;

public class City : Base
{
    public string Name { get; set; } = string.Empty;
    public Guid CountryId { get; set; }
    public Country? Country { get; private set; }
}