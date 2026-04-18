using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using YanCarz.Application.Places;

namespace YanCarz.API.Controllers.Shared;

[ApiController]
[Route("api/shared/[controller]")]
[ApiExplorerSettings(GroupName = "shared")]

public class PlaceController : ControllerBase
{
    private readonly PlaceService _service;

    public PlaceController(PlaceService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<PlaceDto>>> GetAll()
    {
        var places = await _service.GetAllAsync();
        return Ok(places);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<PlaceDto>> GetById(Guid id)
    {
        var place = await _service.GetByIdAsync(id);
        if (place == null)
            return NotFound();

        return Ok(place);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PlaceCreateDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Place name is required.");

        if (request.CountryId == Guid.Empty)
            return BadRequest("CountryId is required.");

        await _service.CreateAsync(request);
        return StatusCode(StatusCodes.Status201Created);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] PlaceUpdateDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Place name is required.");

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
