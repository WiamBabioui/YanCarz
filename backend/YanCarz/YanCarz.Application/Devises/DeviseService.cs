using YanCarz.Domain.Entities;
using YanCarz.Domain.Interfaces;

namespace YanCarz.Application.Devises;

public class DeviseService
{
    private readonly IDeviseRepository _repository;

    public DeviseService(IDeviseRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<DeviseDto>> GetAllAsync()
    {
        var devises = await _repository.GetAllAsync();
        return devises.Select(d => new DeviseDto
        {
            Id = d.Id,
            Code = d.Code,
            Name = d.Name
        }).ToList();
    }

    public async Task<Guid> CreateAsync(string code, string name)
    {
        var devise = new Devise(code, name);
        await _repository.AddAsync(devise);
        return devise.Id;
    }

    public async Task<DeviseDto?> GetByIdAsync(Guid id)
    {
        var devise = await _repository.GetByIdAsync(id);
        if (devise == null) return null;

        return new DeviseDto
        {
            Id = devise.Id,
            Code = devise.Code,
            Name = devise.Name
        };
    }

    public async Task<bool> UpdateAsync(Guid id, string code, string name)
    {
        var devise = await _repository.GetByIdAsync(id);
        if (devise == null) return false;

        devise.Code = code;
        devise.Name = name;

        await _repository.UpdateAsync(devise);
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var devise = await _repository.GetByIdAsync(id);
        if (devise == null) return false;

        await _repository.DeleteAsync(devise);
        return true;
    }
}