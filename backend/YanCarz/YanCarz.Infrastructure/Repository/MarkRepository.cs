using Microsoft.EntityFrameworkCore;
using YanCarz.Domain.Entities;
using YanCarz.Domain.Interfaces;
using YanCarz.Infrastructure.Data;

namespace YanCarz.Infrastructure.Repository
{
    public class MarkRepository : IMarkRepository
    {
        private readonly YanCarzDbContext _context;

        public MarkRepository(YanCarzDbContext context)
        {
            _context = context;
        }

        public async Task<List<Mark>> GetAllAsync() => await _context.Marks.ToListAsync();

        public async Task<Mark?> GetByIdAsync(Guid id) => await _context.Marks.FindAsync(id);

        public async Task AddAsync(Mark obj)
        {
            await _context.Marks.AddAsync(obj);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Mark obj)
        {
            _context.Marks.Update(obj);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Mark obj)
        {
            _context.Marks.Remove(obj);
            await _context.SaveChangesAsync();
        }
    }
}