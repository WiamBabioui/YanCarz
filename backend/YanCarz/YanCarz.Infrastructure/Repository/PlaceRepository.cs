using Microsoft.EntityFrameworkCore;
using YanCarz.Domain.Entities;
using YanCarz.Domain.Interfaces;
using YanCarz.Infrastructure.Data;

namespace YanCarz.Infrastructure.Repository;

public class PlaceRepository : IPlaceRepository
{
    private readonly YanCarzDbContext _context;

    public PlaceRepository(YanCarzDbContext context)
    {
        _context = context;
    }

    public async Task<List<Place>> GetAllAsync()
        => await _context.Places.ToListAsync();

    public async Task<Place?> GetByIdAsync(Guid id)
        => await _context.Places.FindAsync(id);

    public async Task AddAsync(Place obj)
    {
        await _context.Places.AddAsync(obj);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Place obj)
    {
        _context.Places.Update(obj);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Place obj)
    {
        _context.Places.Remove(obj);
        await _context.SaveChangesAsync();
    }
}
