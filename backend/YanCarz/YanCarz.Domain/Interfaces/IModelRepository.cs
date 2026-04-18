using YanCarz.Domain.Entities;

namespace YanCarz.Domain.Interfaces;

public interface IModelRepository
{
    Task<List<Model>> GetAllAsync();
    Task<Model?> GetByIdAsync(Guid id);
    Task AddAsync(Model obj);
    Task UpdateAsync(Model obj);
    Task DeleteAsync(Model obj);
}