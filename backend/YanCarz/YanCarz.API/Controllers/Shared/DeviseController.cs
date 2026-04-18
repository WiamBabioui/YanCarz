using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using YanCarz.Application.Devises;

namespace YanCarz.API.Controllers.Shared;

[ApiController]
[Route("api/shared/[controller]")]
[ApiExplorerSettings(GroupName = "shared")]

public class DeviseController : ControllerBase
{
    private readonly DeviseService _service;

    public DeviseController(DeviseService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<DeviseDto>>> GetAll()
    {
        var devises = await _service.GetAllAsync();
        return Ok(devises);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<DeviseDto>> GetById(Guid id)
    {
        var devise = await _service.GetByIdAsync(id);
        if (devise == null) return NotFound();
        return Ok(devise);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] DeviseDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Code) || string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Code and Name are required.");

        var id = await _service.CreateAsync(request.Code, request.Name);
        return CreatedAtAction(nameof(GetById), new { id }, null);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] DeviseDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Code) || string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Code and Name are required.");

        var updated = await _service.UpdateAsync(id, request.Code, request.Name);
        if (!updated) return NotFound();
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _service.DeleteAsync(id);
        if (!deleted) return NotFound();
        return NoContent();
    }
}