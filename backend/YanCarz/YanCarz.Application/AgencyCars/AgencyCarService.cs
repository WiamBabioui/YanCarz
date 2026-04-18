using YanCarz.Domain.Entities;
using YanCarz.Domain.Interfaces;

namespace YanCarz.Application.AgencyCars;

public class AgencyCarService
{
    private readonly IAgencyCarRepository _repository;

    public AgencyCarService(IAgencyCarRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<AgencyCarDto>> GetAllAsync()
    {
        var cars = await _repository.GetAllAsync();

        return cars.Select(c => new AgencyCarDto
        {
            Id = c.Id,
            Year = c.Year,
            ModelId = c.ModelId,
            ModelName = c.Model?.Name ?? string.Empty,
            PlateNumber = c.PlateNumber,
            Color = c.Color,
            FuelType = c.FuelType,
            Seats = c.Seats,
            PricePerDay = c.PricePerDay,
            AgencyId = c.AgencyId,
            AgencyName = c.Agency?.Name ?? string.Empty,
            Status = c.Status
        }).ToList();
    }

    public async Task<AgencyCarDto?> GetByIdAsync(Guid id)
    {
        var car = await _repository.GetByIdAsync(id);
        if (car == null)
            return null;

        return new AgencyCarDto
        {
            Id = car.Id,
            Year = car.Year,
            ModelId = car.ModelId,
            ModelName = car.Model?.Name ?? string.Empty,
            PlateNumber = car.PlateNumber,
            Color = car.Color,
            FuelType = car.FuelType,
            Seats = car.Seats,
            PricePerDay = car.PricePerDay,
            AgencyId = car.AgencyId,
            AgencyName = car.Agency?.Name ?? string.Empty,
            Status = car.Status
        };
    }

    public async Task<Guid> CreateAsync(AgencyCarCreateDto request)
    {
        var agencyCar = new AgencyCar
        {
            Year = request.Year,
            ModelId = request.ModelId,
            PlateNumber = request.PlateNumber,
            Color = request.Color,
            FuelType = request.FuelType,
            Seats = request.Seats,
            PricePerDay = request.PricePerDay,
            AgencyId = request.AgencyId,
            Status = request.Status
        };

        await _repository.AddAsync(agencyCar);
        return agencyCar.Id;
    }

    public async Task<bool> UpdateAsync(Guid id, AgencyCarUpdateDto request)
    {
        var agencyCar = await _repository.GetByIdAsync(id);
        if (agencyCar == null)
            return false;

        agencyCar.Year = request.Year;
        agencyCar.ModelId = request.ModelId;
        agencyCar.PlateNumber = request.PlateNumber;
        agencyCar.Color = request.Color;
        agencyCar.FuelType = request.FuelType;
        agencyCar.Seats = request.Seats;
        agencyCar.PricePerDay = request.PricePerDay;
        agencyCar.AgencyId = request.AgencyId;
        agencyCar.Status = request.Status;

        await _repository.UpdateAsync(agencyCar);
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var agencyCar = await _repository.GetByIdAsync(id);
        if (agencyCar == null)
            return false;

        await _repository.DeleteAsync(agencyCar);
        return true;
    }

    public async Task<AgencyCarPagedResultDto> GetByAgencyWithFiltersAsync(Guid agencyId, AgencyCarFilterDto filter)
    {
        var page = filter.Page <= 0 ? 1 : filter.Page;
        var pageSize = filter.PageSize <= 0 ? 10 : Math.Min(filter.PageSize, 100);

        var requestedAgencyIds = filter.AgencyIds?
            .Where(x => x != Guid.Empty)
            .Distinct()
            .ToList() ?? new List<Guid>();

        if (agencyId != Guid.Empty && !requestedAgencyIds.Contains(agencyId))
            requestedAgencyIds.Add(agencyId);

        IReadOnlyCollection<Guid>? effectiveAgencyIds = requestedAgencyIds.Count > 0
            ? requestedAgencyIds
            : null;

        var requestedModelIds = filter.ModelIds?
            .Where(x => x != Guid.Empty)
            .Distinct()
            .ToList() ?? new List<Guid>();

        if (filter.ModelId.HasValue && filter.ModelId.Value != Guid.Empty && !requestedModelIds.Contains(filter.ModelId.Value))
            requestedModelIds.Add(filter.ModelId.Value);

        IReadOnlyCollection<Guid>? effectiveModelIds = requestedModelIds.Count > 0
            ? requestedModelIds
            : null;

        var requestedTypeModels = filter.TypeModels?
            .Distinct()
            .ToList() ?? new List<YanCarz.Domain.Enums.TypeModel>();

        if (filter.TypeModel.HasValue && !requestedTypeModels.Contains(filter.TypeModel.Value))
            requestedTypeModels.Add(filter.TypeModel.Value);

        IReadOnlyCollection<YanCarz.Domain.Enums.TypeModel>? effectiveTypeModels = requestedTypeModels.Count > 0
            ? requestedTypeModels
            : null;

        var requestedStatuses = filter.Statuses?
            .Distinct()
            .ToList() ?? new List<YanCarz.Domain.Enums.VehicleStatus>();

        if (filter.Status.HasValue && !requestedStatuses.Contains(filter.Status.Value))
            requestedStatuses.Add(filter.Status.Value);

        IReadOnlyCollection<YanCarz.Domain.Enums.VehicleStatus>? effectiveStatuses = requestedStatuses.Count > 0
            ? requestedStatuses
            : null;

        var (cars, totalCount) = await _repository.SearchByAgenciesAsync(
            effectiveAgencyIds,
            effectiveModelIds,
            filter.ModelName,
            effectiveTypeModels,
            filter.FuelType,
            effectiveStatuses,
            filter.MinPricePerDay,
            filter.MaxPricePerDay,
            filter.MinSeats,
            filter.MinYear,
            filter.MaxYear,
            page,
            pageSize
        );

        var items = cars.Select(c => new AgencyCarDto
        {
            Id = c.Id,
            Year = c.Year,
            ModelId = c.ModelId,
            ModelName = c.Model?.Name ?? string.Empty,
            PlateNumber = c.PlateNumber,
            Color = c.Color,
            FuelType = c.FuelType,
            Seats = c.Seats,
            PricePerDay = c.PricePerDay,
            AgencyId = c.AgencyId,
            AgencyName = c.Agency?.Name ?? string.Empty,
            Status = c.Status
        }).ToList();

        var totalPages = totalCount == 0 ? 0 : (int)Math.Ceiling(totalCount / (double)pageSize);

        return new AgencyCarPagedResultDto
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount,
            TotalPages = totalPages
        };
    }
}
