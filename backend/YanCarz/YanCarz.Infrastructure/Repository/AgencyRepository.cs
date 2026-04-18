using Microsoft.EntityFrameworkCore;
using YanCarz.Domain.Entities;
using YanCarz.Domain.Interfaces;
using YanCarz.Infrastructure.Data;

namespace YanCarz.Infrastructure.Repository;

public class AgencyRepository : IAgencyRepository
{
    private readonly YanCarzDbContext _context;

    public AgencyRepository(YanCarzDbContext context)
    {
        _context = context;
    }

    public async Task<List<Agency>> GetAllAsync()
        => await _context.Agencies.ToListAsync();

    public async Task<Agency?> GetByIdAsync(Guid id)
        => await _context.Agencies.FindAsync(id);

    public async Task AddAsync(Agency agency)
    {
        await _context.Agencies.AddAsync(agency);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Agency agency)
    {
        _context.Agencies.Update(agency);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var agency = await _context.Agencies.FindAsync(id);
        if (agency != null)
        {
            _context.Agencies.Remove(agency);
            await _context.SaveChangesAsync();
        }
    }
}