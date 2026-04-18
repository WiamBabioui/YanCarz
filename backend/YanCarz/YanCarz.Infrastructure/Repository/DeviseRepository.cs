using Microsoft.EntityFrameworkCore;
using YanCarz.Domain.Entities;
using YanCarz.Domain.Interfaces;
using YanCarz.Infrastructure.Data;

namespace YanCarz.Infrastructure.Repository;

public class DeviseRepository : IDeviseRepository
{
    private readonly YanCarzDbContext _context;

    public DeviseRepository(YanCarzDbContext context)
    {
        _context = context;
    }

    public async Task<List<Devise>> GetAllAsync() => await _context.Devises.ToListAsync();

    public async Task<Devise?> GetByIdAsync(Guid id) => await _context.Devises.FindAsync(id);

    public async Task AddAsync(Devise obj)
    {
        await _context.Devises.AddAsync(obj);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Devise obj)
    {
        _context.Devises.Update(obj);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Devise obj)
    {
        _context.Devises.Remove(obj);
        await _context.SaveChangesAsync();
    }
}