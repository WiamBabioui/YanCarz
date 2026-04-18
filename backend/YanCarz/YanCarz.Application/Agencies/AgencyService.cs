using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YanCarz.Domain.Entities;
using YanCarz.Domain.Interfaces;
using YanCarz.Domain.ValueObjects;

namespace YanCarz.Application.Agencies
{
    public class AgencyService
    {
        private readonly IAgencyRepository _repository; 
        private readonly IAgencyUserRepository _repositoryAgencyUser;


        public AgencyService(IAgencyRepository repository, IAgencyUserRepository repositoryAgencyUser   )
        {
            _repository = repository;
            _repositoryAgencyUser = repositoryAgencyUser;
        }

        public async Task<List<AgencyDto>> GetAllAsync()
        {
            var agencies = await _repository.GetAllAsync();

            return agencies.Select(a => new AgencyDto
            {
                Id = a.Id,
                Name = a.Name,
                EMail = a.EMAil,
                NbrPhone = a.NbrPhone,
                Address = a.Address.AddressComplte
            }).ToList();
        }

        public async Task<AgencyDto?> GetByIdAsync(Guid id)
        {
            var agency = await _repository.GetByIdAsync(id);
            if (agency == null)
                return null;

            return new AgencyDto
            {
                Id = agency.Id,
                Name = agency.Name,
                EMail = agency.EMAil,
                NbrPhone = agency.NbrPhone,
                Address = agency.Address.AddressComplte
            };
        }
       

        public async Task<Guid> CreateAsync(AgencyCreateDto request)
        {
            var agency = new Agency
            {
                Name = request.Name,
                EMAil = request.EMail,
                NbrPhone = request.NbrPhone,
                
                Address = new Address
                {
                    AddressComplte = request.Address
                }
            };
            await _repository.AddAsync(agency);

            var agencyUser = new AgencyUser
            {
                AgencyId = agency.Id,
                FirstName = request.FirstMame,
                LastName = request.LastName,
                EMail = request.EMail,
                Telephone = request.NbrPhone,
                Status = "Admin"
            };
            await _repositoryAgencyUser.AddAsync(agencyUser);

            return agency.Id;
        }

        public async Task DeleteAsync(Guid id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}