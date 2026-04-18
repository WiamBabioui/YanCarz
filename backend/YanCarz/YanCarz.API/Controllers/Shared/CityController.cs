using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using YanCarz.Application.Cities;

namespace YanCarz.API.Controllers.Shared;

[ApiController]
[Route("api/shared/[controller]")]
[ApiExplorerSettings(GroupName = "shared")]

public class CityController : ControllerBase
{
    private readonly CityService _service;

    public CityController(CityService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<CityDto>>> GetAll()
    {
        var cities = await _service.GetAllAsync();
        return Ok(cities);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<CityDto>> GetById(Guid id)
    {
        var city = await _service.GetByIdAsync(id);
        if (city == null)
            return NotFound();

        return Ok(city);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CityCreateDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("City name is required.");

        if (request.CountryId == Guid.Empty)
            return BadRequest("CountryId is required.");

        await _service.CreateAsync(request);
        return StatusCode(StatusCodes.Status201Created);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] CityUpdateDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("City name is required.");

        if (request.CountryId == Guid.Empty)
            return BadRequest("CountryId is required.");

        var updated = await _service.UpdateAsync(id, request);
        if (!updated)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _service.DeleteAsync(id);
        if (!deleted)
            return NotFound();

        return NoContent();
    }
}
