using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using YanCarz.Application.AgencyCars;
using YanCarz.Application.ResearchRequest;

namespace YanCarz.API.Controllers.Portal
{
    [ApiController]
    [Route("api/portal/[controller]")]
    [ApiExplorerSettings(GroupName = "portal")]

    public class ResearchRequestController : ControllerBase
    {
        private readonly ResearchRequestService _service;
        private readonly AgencyCarService _agencyCarService;

        public ResearchRequestController(ResearchRequestService service, AgencyCarService agencyCarService)
        {
            _service = service;
            _agencyCarService = agencyCarService;
        }

        [HttpPost]
        public async Task<IActionResult> ResearchtHome([FromBody] ResearchRequestHomeDto request)
        {
            if (request.IdPickupLocation == Guid.Empty)
                return BadRequest("CityId is required.");

            await _service.CreateAsync(request);
            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpGet("agency/{agencyId:guid}/cars")]
        public async Task<ActionResult<AgencyCarPagedResultDto>> GetAgencyCars(Guid agencyId, [FromQuery] AgencyCarFilterDto filter)
        {
            if (agencyId == Guid.Empty)
                return BadRequest("AgencyId is required.");

            if (filter.MinPricePerDay.HasValue && filter.MaxPricePerDay.HasValue && filter.MinPricePerDay > filter.MaxPricePerDay)
                return BadRequest("MinPricePerDay cannot be greater than MaxPricePerDay.");

            if (filter.MinYear.HasValue && filter.MaxYear.HasValue && filter.MinYear > filter.MaxYear)
                return BadRequest("MinYear cannot be greater than MaxYear.");

            var result = await _agencyCarService.GetByAgencyWithFiltersAsync(agencyId, filter);
            return Ok(result);
        }

        [HttpGet("cars")]
        public async Task<ActionResult<AgencyCarPagedResultDto>> GetAgencyCarsByFilters([FromQuery] AgencyCarFilterDto filter)
        {
            if (filter.AgencyIds == null || filter.AgencyIds.Count == 0)
                return BadRequest("At least one AgencyId is required in filters.");

            if (filter.MinPricePerDay.HasValue && filter.MaxPricePerDay.HasValue && filter.MinPricePerDay > filter.MaxPricePerDay)
                return BadRequest("MinPricePerDay cannot be greater than MaxPricePerDay.");

            if (filter.MinYear.HasValue && filter.MaxYear.HasValue && filter.MinYear > filter.MaxYear)
                return BadRequest("MinYear cannot be greater than MaxYear.");

            var result = await _agencyCarService.GetByAgencyWithFiltersAsync(Guid.Empty, filter);
            return Ok(result);
        }

       

    }
}
