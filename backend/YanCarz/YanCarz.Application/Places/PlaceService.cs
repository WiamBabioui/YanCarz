using YanCarz.Domain.Entities;
using YanCarz.Domain.Interfaces;

namespace YanCarz.Application.Places;

public class PlaceService
{
    private readonly IPlaceRepository _repository;

    public PlaceService(IPlaceRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<PlaceDto>> GetAllAsync()
    {
        var places = await _repository.GetAllAsync();

        return places.Select(p => new PlaceDto
        {
            Id = p.Id,
            Name = p.Name,
            CountryId = p.CountryId
        }).ToList();
    }

    public async Task<PlaceDto?> GetByIdAsync(Guid id)
    {
        var place = await _repository.GetByIdAsync(id);
        if (place == null)
            return null;

        return new PlaceDto
        {
            Id = place.Id,
            Name = place.Name,
            CountryId = place.CountryId
        };
    }

    public async Task CreateAsync(PlaceCreateDto placeDto)
    {
        var place = new Place
        {
            Name = placeDto.Name,
            CountryId = placeDto.CountryId
        };

        await _repository.AddAsync(place);
    }

    public async Task<bool> UpdateAsync(Guid id, PlaceUpdateDto placeDto)
    {
        var place = await _repository.GetByIdAsync(id);
        if (place == null)
            return false;

        place.Name = placeDto.Name;
        place.CountryId = placeDto.CountryId;

        await _repository.UpdateAsync(place);
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var place = await _repository.GetByIdAsync(id);
        if (place == null)
            return false;

        await _repository.DeleteAsync(place);
        return true;
    }
}
