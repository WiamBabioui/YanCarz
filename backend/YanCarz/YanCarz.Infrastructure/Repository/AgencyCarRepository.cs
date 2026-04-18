using Microsoft.EntityFrameworkCore;
using YanCarz.Domain.Entities;
using YanCarz.Domain.Enums;
using YanCarz.Domain.Interfaces;
using YanCarz.Infrastructure.Data;

namespace YanCarz.Infrastructure.Repository;

public class AgencyCarRepository : IAgencyCarRepository
{
    private readonly YanCarzDbContext _context;

    public AgencyCarRepository(YanCarzDbContext context)
    {
        _context = context;
    }

    public async Task<List<AgencyCar>> GetAllAsync()
        => await _context.AgencyCars
            .Include(x => x.Agency)
            .Include(x => x.Model)
            .ToListAsync();

    public async Task<AgencyCar?> GetByIdAsync(Guid id)
        => await _context.AgencyCars
            .Include(x => x.Agency)
            .Include(x => x.Model)
            .FirstOrDefaultAsync(x => x.Id == id);

    public async Task<(List<AgencyCar> Cars, int TotalCount)> SearchByAgenciesAsync(
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
        int pageSize)
    {
        var query = _context.AgencyCars
            .Include(x => x.Agency)
            .Include(x => x.Model)
            .AsQueryable();

        if (agencyIds is { Count: > 0 })
            query = query.Where(x => agencyIds.Contains(x.AgencyId));

        if (modelIds is { Count: > 0 })
            query = query.Where(x => modelIds.Contains(x.ModelId));

        if (!string.IsNullOrWhiteSpace(modelName))
            query = query.Where(x => x.Model != null && x.Model.Name.Contains(modelName));

        if (typeModels is { Count: > 0 })
            query = query.Where(x => x.Model != null && typeModels.Contains(x.Model.TypeModel));

        if (fuelType.HasValue)
            query = query.Where(x => x.FuelType == fuelType.Value);

        if (statuses is { Count: > 0 })
            query = query.Where(x => statuses.Contains(x.Status));

        if (minPricePerDay.HasValue)
            query = query.Where(x => x.PricePerDay >= minPricePerDay.Value);

        if (maxPricePerDay.HasValue)
            query = query.Where(x => x.PricePerDay <= maxPricePerDay.Value);

        if (minSeats.HasValue)
            query = query.Where(x => x.Seats >= minSeats.Value);

        if (minYear.HasValue)
            query = query.Where(x => x.Year >= minYear.Value);

        if (maxYear.HasValue)
            query = query.Where(x => x.Year <= maxYear.Value);

        var totalCount = await query.CountAsync();

        var cars = await query
            .OrderBy(x => x.PricePerDay)
            .ThenBy(x => x.Model != null ? x.Model.Name : string.Empty)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (cars, totalCount);
    }

    public async Task AddAsync(AgencyCar agencyCar)
    {
        await _context.AgencyCars.AddAsync(agencyCar);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(AgencyCar agencyCar)
    {
        _context.AgencyCars.Update(agencyCar);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(AgencyCar agencyCar)
    {
        _context.AgencyCars.Remove(agencyCar);
        await _context.SaveChangesAsync();
    }
}
