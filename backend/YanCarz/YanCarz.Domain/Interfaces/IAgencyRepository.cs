using System;
using System.Collections.Generic;
using YanCarz.Domain.Entities;

public interface IAgencyRepository
{
    Task<List<Agency>> GetAllAsync();
    Task<Agency?> GetByIdAsync(Guid id);
    Task AddAsync(Agency agency);
    Task UpdateAsync(Agency agency);
    Task DeleteAsync(Guid id);
}