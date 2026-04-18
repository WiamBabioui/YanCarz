using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using YanCarz.Domain.Entities;
using YanCarz.Domain.Interfaces;
using YanCarz.Infrastructure.Data;

namespace YanCarz.Infrastructure.Repository;

public class CountryRepository : ICountryRepository
{
    private readonly YanCarzDbContext _context;

    public CountryRepository(YanCarzDbContext context)
    {
        _context = context;
    }

    public async Task<List<Country>> GetAllAsync()
        => await _context.Countries.ToListAsync();

    public async Task<Country?> GetByIdAsync(Guid id)
    {
        return await _context.Countries.FindAsync(id);
    }

    public async Task AddAsync(Country obj)
    {
        await _context.Countries.AddAsync(obj);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Country obj)
    {
        _context.Countries.Update(obj);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Country obj)
    {
        _context.Countries.Remove(obj);
        await _context.SaveChangesAsync();
    }
}
