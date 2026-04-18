using YanCarz.Domain.Entities;
using YanCarz.Domain.Interfaces;

namespace YanCarz.Application.Users;

public class UserService
{
    private readonly IUserRepository _repository;

    public UserService(IUserRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<UserDto>> GetAllAsync()
    {
        var users = await _repository.GetAllAsync();

        return users.Select(u => new UserDto
        {
            Id = u.Id,
            Name = u.Name,
            Email = u.Email
        }).ToList();
    }

    public async Task<Guid> CreateAsync(string name, string email, string password)
    {
        var user = new User(name, email, password);
        await _repository.AddAsync(user);
        return user.Id;
    }

    public async Task<UserDto?> GetByIdAsync(Guid id)
    {
        var user = await _repository.GetByIdAsync(id);

        if (user == null)
            return null;

        return new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email
        };
    }

    public async Task<bool> UpdateAsync(Guid id, string name, string email)
    {
        var user = await _repository.GetByIdAsync(id);

        if (user == null)
            return false;

        user.Name = name;
        user.Email = email;

        await _repository.UpdateAsync(user);

        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var user = await _repository.GetByIdAsync(id);

        if (user == null)
            return false;

        await _repository.DeleteAsync(user);

        return true;
    }
}