using YanCarz.Domain.Entities;
using YanCarz.Domain.Interfaces;

namespace YanCarz.Application.Cities;

public class CityService
{
    private readonly ICityRepository _repository;

    public CityService(ICityRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<CityDto>> GetAllAsync()
    {
        var countries = await _repository.GetAllAsync();

        return countries.Select(c => new CityDto
        {
            Id = c.Id,
            Name = c.Name,
        }).ToList();
    }

    public async Task<CityDto?> GetByIdAsync(Guid id)
    {
        var city = await _repository.GetByIdAsync(id);

        if (city == null)
            return null;

        return new CityDto
        {
            Id = city.Id,
            Name = city.Name,
        };
    }

    public async Task CreateAsync(CityCreateDto cityDto)
    {
        var city = new City
        {
            Name = cityDto.Name,
            CountryId = cityDto.CountryId
        };

        await _repository.AddAsync(city);
    }

    public async Task<bool> UpdateAsync(Guid id, CityUpdateDto cityDto)
    {
        var city = await _repository.GetByIdAsync(id);
        if (city == null)
            return false;

        city.Name = cityDto.Name;
        city.CountryId = cityDto.CountryId;

        await _repository.UpdateAsync(city);
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var city = await _repository.GetByIdAsync(id);
        if (city == null)
            return false;

        await _repository.DeleteAsync(city);
        return true;
    }



}
