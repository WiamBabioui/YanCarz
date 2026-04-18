using System;
using YanCarz.Domain.Entities;

namespace YanCarz.Application.ResearchRequest;

public class ResearchRequestHomeDto
{
    public DateTime DepartureDate { get; set; }
    public DateTime ReturnDate { get; set; }
    public Guid IdPickupLocation { get; set; }
    public Guid IdDropOffLocation { get; set; }
}
