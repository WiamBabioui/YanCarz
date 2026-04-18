using YanCarz.Domain.Entities;
using YanCarz.Domain.Interfaces;

namespace YanCarz.Application.ResearchRequest;

public class ResearchRequestService
{
    private readonly IResearchRequestRepository _repository;

    public ResearchRequestService(IResearchRequestRepository repository)
    {
        _repository = repository;
    }

    public async Task CreateAsync(ResearchRequestHomeDto researchRequestDto)
    {
        var researchRequest = new YanCarz.Domain.Entities.ResearchRequest
        {
            DepartureDate = researchRequestDto.DepartureDate,
            ReturnDate = researchRequestDto.ReturnDate,
            IdPickupLocation = researchRequestDto.IdPickupLocation,
            IdDropOffLocation = researchRequestDto.IdDropOffLocation
        };

        await _repository.AddAsync(researchRequest);
    }

}
