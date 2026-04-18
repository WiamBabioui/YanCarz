using YanCarz.Domain.Entities;
using YanCarz.Domain.Interfaces;

namespace YanCarz.Application.Countries;

public class CountryService
{
    private readonly ICountryRepository _repository;

    public CountryService(ICountryRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<CountryDto>> GetAllAsync()
    {
        var countries = await _repository.GetAllAsync();

        return countries.Select(c => new CountryDto
        {
            Id = c.Id,
            Name = c.Name,
        }).ToList();
    }

    public async Task<Guid> CreateAsync(string name)
    {
        var country = new Country(name);
        await _repository.AddAsync(country);
        return country.Id;
    }

    public async Task<CountryDto?> GetByIdAsync(Guid id)
    {
        var country = await _repository.GetByIdAsync(id);
        if (country == null)
            return null;

        return new CountryDto
        {
            Id = country.Id,
            Name = country.Name,
        };
    }

    public async Task<bool> UpdateAsync(Guid id, string name)
    {
        var country = await _repository.GetByIdAsync(id);
        if (country == null)
            return false;

        country.Name = name;
        await _repository.UpdateAsync(country);
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var country = await _repository.GetByIdAsync(id);
        if (country == null)
            return false;

        await _repository.DeleteAsync(country);
        return true;
    }
}