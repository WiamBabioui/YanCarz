using YanCarz.Domain.Entities;

namespace YanCarz.Domain.Interfaces
{
    public interface IMarkRepository
    {
        Task<List<Mark>> GetAllAsync();
        Task<Mark?> GetByIdAsync(Guid id);
        Task AddAsync(Mark obj);
        Task UpdateAsync(Mark obj);
        Task DeleteAsync(Mark obj);
    }
}