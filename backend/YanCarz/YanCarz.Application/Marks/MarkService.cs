using YanCarz.Domain.Entities;
using YanCarz.Domain.Interfaces;

namespace YanCarz.Application.Marks
{
    public class MarkService
    {
        private readonly IMarkRepository _repository;

        public MarkService(IMarkRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<MarkDto>> GetAllAsync()
        {
            var marks = await _repository.GetAllAsync();
            return marks.Select(m => new MarkDto
            {
                Id = m.Id,
                Name = m.Name
            }).ToList();
        }

        public async Task<Guid> CreateAsync(string name)
        {
            var mark = new Mark { Name = name };
            await _repository.AddAsync(mark);
            return mark.Id;
        }

        public async Task<MarkDto?> GetByIdAsync(Guid id)
        {
            var mark = await _repository.GetByIdAsync(id);
            if (mark == null) return null;
            return new MarkDto { Id = mark.Id, Name = mark.Name };
        }

        public async Task<bool> UpdateAsync(Guid id, string name)
        {
            var mark = await _repository.GetByIdAsync(id);
            if (mark == null) return false;
            mark.Name = name;
            await _repository.UpdateAsync(mark);
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var mark = await _repository.GetByIdAsync(id);
            if (mark == null) return false;
            await _repository.DeleteAsync(mark);
            return true;
        }
    }
}