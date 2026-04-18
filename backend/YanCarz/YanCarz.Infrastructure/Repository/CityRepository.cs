using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using YanCarz.Domain.Entities;
using YanCarz.Domain.Interfaces;
using YanCarz.Infrastructure.Data;

namespace YanCarz.Infrastructure.Repository
{
    public class CityRepository : ICityRepository
    {
        private readonly YanCarzDbContext _context;

        public CityRepository(YanCarzDbContext context)
        {
            _context = context;
        }

        public async Task<List<City>> GetAllAsync()
            => await _context.Cities.ToListAsync();

        public async Task<City?> GetByIdAsync(Guid id)
            => await _context.Cities.FindAsync(id);

        public async Task AddAsync(City obj)
        {
            await _context.Cities.AddAsync(obj);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(City obj)
        {
            _context.Cities.Update(obj);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(City obj)
        {
            _context.Cities.Remove(obj);
            await _context.SaveChangesAsync();
        }
    }
}
