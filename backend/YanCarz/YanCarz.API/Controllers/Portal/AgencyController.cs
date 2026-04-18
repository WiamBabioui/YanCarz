using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using YanCarz.Application.Agencies;

namespace YanCarz.API.Controllers;

[ApiController]
[Route("api/portal/[controller]")]
[ApiExplorerSettings(GroupName = "portal")]

public class AgencyController : ControllerBase
{
    private readonly AgencyService _service;

    public AgencyController(AgencyService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<AgencyDto>>> GetAll()
    {
        var agencies = await _service.GetAllAsync();
        return Ok(agencies);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<AgencyDto>> GetById(Guid id)
    {
        var agency = await _service.GetByIdAsync(id);
        if (agency == null)
            return NotFound();

        return Ok(agency);
    }

}