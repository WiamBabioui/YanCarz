using YanCarz.Domain.Enums;

namespace YanCarz.Application.AgencyCars;

public class AgencyCarDto
{
    public Guid Id { get; set; }
    public int Year { get; set; }
    public Guid ModelId { get; set; }
    public string ModelName { get; set; } = string.Empty;
    public string PlateNumber { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public FuelType FuelType { get; set; }
    public int Seats { get; set; }
    public decimal PricePerDay { get; set; }
    public Guid AgencyId { get; set; }
    public string AgencyName { get; set; } = string.Empty;
    public VehicleStatus Status { get; set; }
}

public class AgencyCarCreateDto
{
    public int Year { get; set; }
    public Guid ModelId { get; set; }
    public string PlateNumber { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public FuelType FuelType { get; set; }
    public int Seats { get; set; }
    public decimal PricePerDay { get; set; }
    public Guid AgencyId { get; set; }
    public VehicleStatus Status { get; set; }
}

public class AgencyCarUpdateDto
{
    public int Year { get; set; }
    public Guid ModelId { get; set; }
    public string PlateNumber { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public FuelType FuelType { get; set; }
    public int Seats { get; set; }
    public decimal PricePerDay { get; set; }
    public Guid AgencyId { get; set; }
    public VehicleStatus Status { get; set; }
}

public class AgencyCarFilterDto
{
    public List<Guid>? AgencyIds { get; set; }
    public Guid? ModelId { get; set; }
    public List<Guid>? ModelIds { get; set; }
    public string? ModelName { get; set; }
    public TypeModel? TypeModel { get; set; }
    public List<TypeModel>? TypeModels { get; set; }
    public FuelType? FuelType { get; set; }
    public VehicleStatus? Status { get; set; }
    public List<VehicleStatus>? Statuses { get; set; }
    public decimal? MinPricePerDay { get; set; }
    public decimal? MaxPricePerDay { get; set; }
    public int? MinSeats { get; set; }
    public int? MinYear { get; set; }
    public int? MaxYear { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}

public class AgencyCarPagedResultDto
{
    public List<AgencyCarDto> Items { get; set; } = new();
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    public int TotalPages { get; set; }
}
