using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using YanCarz.Domain.Entities;
using YanCarz.Domain.Interfaces;
using YanCarz.Infrastructure.Data;

namespace YanCarz.Infrastructure.Repository;

public class UserRepository : IUserRepository
{
    private readonly YanCarzDbContext _context;

    public UserRepository(YanCarzDbContext context)
    {
        _context = context;
    }

    public async Task<List<User>> GetAllAsync()
        => await _context.Users.ToListAsync();

    public async Task<User?> GetByIdAsync(Guid id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task AddAsync(User obj)
    {
        await _context.Users.AddAsync(obj);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(User obj)
    {
        _context.Users.Update(obj);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(User obj)
    {
        _context.Users.Remove(obj);
        await _context.SaveChangesAsync();
    }
}