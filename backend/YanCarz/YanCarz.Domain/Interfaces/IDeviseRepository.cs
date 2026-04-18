using YanCarz.Domain.Entities;

namespace YanCarz.Domain.Interfaces
{
    public interface IDeviseRepository
    {
        Task<List<Devise>> GetAllAsync();
        Task<Devise?> GetByIdAsync(Guid id);
        Task AddAsync(Devise obj);
        Task UpdateAsync(Devise obj);
        Task DeleteAsync(Devise obj);
    }
}