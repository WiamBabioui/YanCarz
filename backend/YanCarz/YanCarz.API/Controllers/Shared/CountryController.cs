using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using YanCarz.Application.Countries;

namespace YanCarz.API.Controllers.Shared;

[ApiController]
[Route("api/shared/[controller]")]
[ApiExplorerSettings(GroupName = "shared")]

public class CountryController : ControllerBase
{
    private readonly CountryService _service;

    public CountryController(CountryService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<CountryDto>>> GetAll()
    {
        var countries = await _service.GetAllAsync();
        return Ok(countries);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<CountryDto>> GetById(Guid id)
    {
        var country = await _service.GetByIdAsync(id);
        if (country == null)
            return NotFound();

        return Ok(country);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] string request)
    {
        if (string.IsNullOrWhiteSpace(request))
            return BadRequest("Country name is required.");

        var id = await _service.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id }, null);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] CountryDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Country name is required.");

        var updated = await _service.UpdateAsync(id, request.Name);
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
