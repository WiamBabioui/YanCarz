using YanCarz.Domain.Entities;

namespace YanCarz.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllAsync();
        Task<User?> GetByIdAsync(Guid id);
        Task AddAsync(User obj);
        Task UpdateAsync(User obj);
        Task DeleteAsync(User obj);
    }
}