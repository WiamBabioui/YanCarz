using YanCarz.Domain.Entities;

namespace YanCarz.Domain.Interfaces
{
    public interface ICountryRepository
    {
        Task<List<Country>> GetAllAsync();
        Task<Country?> GetByIdAsync(Guid id);
        Task AddAsync(Country obj);
        Task UpdateAsync(Country obj);
        Task DeleteAsync(Country obj);
    }
}
