using Microsoft.EntityFrameworkCore;
using YanCarz.Domain.Entities;
using YanCarz.Domain.Interfaces;
using YanCarz.Infrastructure.Data;

namespace YanCarz.Infrastructure.Repository;

public class ModelRepository : IModelRepository
{
    private readonly YanCarzDbContext _context;

    public ModelRepository(YanCarzDbContext context)
    {
        _context = context;
    }

    public async Task<List<Model>> GetAllAsync()
        => await _context.Models.Include(m => m.Mark).ToListAsync();

    public async Task<Model?> GetByIdAsync(Guid id)
        => await _context.Models.Include(m => m.Mark).FirstOrDefaultAsync(m => m.Id == id);

    public async Task AddAsync(Model obj)
    {
        await _context.Models.AddAsync(obj);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Model obj)
    {
        _context.Models.Update(obj);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Model obj)
    {
        _context.Models.Remove(obj);
        await _context.SaveChangesAsync();
    }
}