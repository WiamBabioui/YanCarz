using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using YanCarz.Application.AgencyCars;

namespace YanCarz.API.Controllers.Agency;

[ApiController]
[Route("api/agency/[controller]")]
[ApiExplorerSettings(GroupName = "agency")]

public class AgencyCarController : ControllerBase
{
    private readonly AgencyCarService _service;

    public AgencyCarController(AgencyCarService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<AgencyCarDto>>> GetAll()
    {
        var cars = await _service.GetAllAsync();
        return Ok(cars);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<AgencyCarDto>> GetById(Guid id)
    {
        var car = await _service.GetByIdAsync(id);
        if (car == null)
            return NotFound();

        return Ok(car);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AgencyCarCreateDto request)
    {
        if (request.Year <= 0)
            return BadRequest("Year is required.");

        if (request.ModelId == Guid.Empty)
            return BadRequest("ModelId is required.");

        if (request.AgencyId == Guid.Empty)
            return BadRequest("AgencyId is required.");

        if (string.IsNullOrWhiteSpace(request.PlateNumber))
            return BadRequest("PlateNumber is required.");

        if (request.Seats <= 0)
            return BadRequest("Seats must be greater than 0.");

        if (request.PricePerDay < 0)
            return BadRequest("PricePerDay cannot be negative.");

        var id = await _service.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id }, null);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] AgencyCarUpdateDto request)
    {
        if (request.Year <= 0)
            return BadRequest("Year is required.");

        if (request.ModelId == Guid.Empty)
            return BadRequest("ModelId is required.");

        if (request.AgencyId == Guid.Empty)
            return BadRequest("AgencyId is required.");

        if (string.IsNullOrWhiteSpace(request.PlateNumber))
            return BadRequest("PlateNumber is required.");

        if (request.Seats <= 0)
            return BadRequest("Seats must be greater than 0.");

        if (request.PricePerDay < 0)
            return BadRequest("PricePerDay cannot be negative.");

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
