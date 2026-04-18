
using YanCarz.Domain.Entities;

namespace YanCarz.Domain.Interfaces;

public interface IResearchRequestRepository
{
    Task AddAsync(ResearchRequest obj);
}
