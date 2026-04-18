using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using YanCarz.Application.Agencies;

namespace YanCarz.API.Controllers.Agency;

[ApiController]
[Route("api/agency/[controller]")]
[ApiExplorerSettings(GroupName = "agency")]

public class AgencyController : ControllerBase
{
    private readonly AgencyService _service;

    public AgencyController(AgencyService service)
    {
        _service = service;
    }


    [HttpGet("{id:guid}")]
    public async Task<ActionResult<AgencyDto>> GetById(Guid id)
    {
        var agency = await _service.GetByIdAsync(id);
        if (agency == null)
            return NotFound();

        return Ok(agency);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AgencyCreateDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Agency name is required.");

        var id = await _service.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id }, null);
    }
}