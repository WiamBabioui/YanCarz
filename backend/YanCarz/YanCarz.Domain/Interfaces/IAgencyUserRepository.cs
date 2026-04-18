using System;
using System.Collections.Generic;
using YanCarz.Domain.Entities;

namespace YanCarz.Domain.Interfaces
{
    public interface IAgencyUserRepository
    {
        Task<List<AgencyUser>> GetAllAsync();
        Task<AgencyUser?> GetByIdAsync(Guid id);
        Task AddAsync(AgencyUser user);
        Task UpdateAsync(AgencyUser user);
        Task DeleteAsync(Guid id);
    }
}