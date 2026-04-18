
using YanCarz.Domain.Entities;

namespace YanCarz.Domain.Interfaces;

public interface ICityRepository
{
    Task<List<City>> GetAllAsync();
    Task<City?> GetByIdAsync(Guid id);
    Task AddAsync(City obj);
    Task UpdateAsync(City obj);
    Task DeleteAsync(City obj);
}
