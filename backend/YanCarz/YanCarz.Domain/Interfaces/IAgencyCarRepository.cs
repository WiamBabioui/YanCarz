using YanCarz.Domain.Entities;
using YanCarz.Domain.Enums;

namespace YanCarz.Domain.Interfaces;

public interface IAgencyCarRepository
{
    Task<List<AgencyCar>> GetAllAsync();
    Task<AgencyCar?> GetByIdAsync(Guid id);
    Task<(List<AgencyCar> Cars, int TotalCount)> SearchByAgenciesAsync(
        IReadOnlyCollection<Guid>? agencyIds,
        IReadOnlyCollection<Guid>? modelIds,
        string? modelName,
        IReadOnlyCollection<TypeModel>? typeModels,
        FuelType? fuelType,
        IReadOnlyCollection<VehicleStatus>? statuses,
        decimal? minPricePerDay,
        decimal? maxPricePerDay,
        int? minSeats,
        int? minYear,
        int? maxYear,
        int page,
        int pageSize
    );
    Task AddAsync(AgencyCar agencyCar);
    Task UpdateAsync(AgencyCar agencyCar);
    Task DeleteAsync(AgencyCar agencyCar);
}
