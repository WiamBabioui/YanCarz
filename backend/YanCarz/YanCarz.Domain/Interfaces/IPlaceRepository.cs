using YanCarz.Domain.Entities;

namespace YanCarz.Domain.Interfaces;

public interface IPlaceRepository
{
    Task<List<Place>> GetAllAsync();
    Task<Place?> GetByIdAsync(Guid id);
    Task AddAsync(Place obj);
    Task UpdateAsync(Place obj);
    Task DeleteAsync(Place obj);
}
