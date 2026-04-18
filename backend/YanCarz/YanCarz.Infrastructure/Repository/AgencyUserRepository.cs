using Microsoft.EntityFrameworkCore;
using YanCarz.Domain.Entities;
using YanCarz.Domain.Interfaces;
using YanCarz.Infrastructure.Data;

namespace YanCarz.Infrastructure.Repository;

public class AgencyUserRepository : IAgencyUserRepository
{
    private readonly YanCarzDbContext _context;

    public AgencyUserRepository(YanCarzDbContext context)
    {
        _context = context;
    }

    public async Task<List<AgencyUser>> GetAllAsync()
        => await _context.AgencyUsers.ToListAsync();

    public async Task<AgencyUser?> GetByIdAsync(Guid id)
        => await _context.AgencyUsers.FindAsync(id);

    public async Task AddAsync(AgencyUser user)
    {
        await _context.AgencyUsers.AddAsync(user);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(AgencyUser user)
    {
        _context.AgencyUsers.Update(user);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var user = await _context.AgencyUsers.FindAsync(id);
        if (user != null)
        {
            _context.AgencyUsers.Remove(user);
            await _context.SaveChangesAsync();
        }
    }
}