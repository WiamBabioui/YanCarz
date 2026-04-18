using YanCarz.Domain.Enums;

namespace YanCarz.Domain.Entities;

public class AgencyCar : Base
{
    public int Year { get; set; }

    public Guid ModelId { get; set; }

    public Model? Model { get; set; }

    public string PlateNumber { get; set; } = string.Empty;

    public string Color { get; set; } = string.Empty;

    public FuelType FuelType { get; set; }

    public int Seats { get; set; }

    public decimal PricePerDay { get; set; }

    public Guid AgencyId { get; set; }

    public Agency? Agency { get; set; }

    public VehicleStatus Status { get; set; }
}
