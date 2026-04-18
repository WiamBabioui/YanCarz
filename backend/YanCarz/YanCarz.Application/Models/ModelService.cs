using YanCarz.Domain.Entities;
using YanCarz.Domain.Enums;
using YanCarz.Domain.Interfaces;

namespace YanCarz.Application.Models;

public class ModelService
{
    private readonly IModelRepository _repository;

    public ModelService(IModelRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<ModelDto>> GetAllAsync()
    {
        var models = await _repository.GetAllAsync();
        return models.Select(m => new ModelDto
        {
            Id = m.Id,
            Name = m.Name,
            TypeModel = m.TypeModel.ToString(),
            MarkId = m.MarkId,
            MarkName = m.Mark?.Name ?? string.Empty
        }).ToList();
    }

    public async Task<Guid> CreateAsync(string name, Guid markId, TypeModel typeModel)
    {
        var model = new Model
        {
            Name = name,
            MarkId = markId,
            TypeModel = typeModel
        };

        await _repository.AddAsync(model);
        return model.Id;
    }

    public async Task<ModelDto?> GetByIdAsync(Guid id)
    {
        var model = await _repository.GetByIdAsync(id);
        if (model == null)
            return null;

        return new ModelDto
        {
            Id = model.Id,
            Name = model.Name,
            TypeModel = model.TypeModel.ToString(),
            MarkId = model.MarkId,
            MarkName = model.Mark?.Name ?? string.Empty
        };
    }

    public async Task<bool> UpdateAsync(Guid id, string name, Guid markId, TypeModel typeModel)
    {
        var model = await _repository.GetByIdAsync(id);
        if (model == null)
            return false;

        model.Name = name;
        model.MarkId = markId;
        model.TypeModel = typeModel;

        await _repository.UpdateAsync(model);
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var model = await _repository.GetByIdAsync(id);
        if (model == null)
            return false;

        await _repository.DeleteAsync(model);
        return true;
    }
}