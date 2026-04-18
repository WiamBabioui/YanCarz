using Microsoft.AspNetCore.Mvc;
using YanCarz.Application.Models;
using YanCarz.Domain.Enums;

namespace YanCarz.API.Controllers.Shared;

[ApiController]
[Route("api/shared/[controller]")]
[ApiExplorerSettings(GroupName = "shared")]

public class ModelController : ControllerBase
{
    private readonly ModelService _service;

    public ModelController(ModelService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<ModelDto>>> GetAll()
        => Ok(await _service.GetAllAsync());

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ModelDto>> GetById(Guid id)
    {
        var model = await _service.GetByIdAsync(id);
        if (model == null)
            return NotFound();
        return Ok(model);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ModelDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Name is required.");

        var id = await _service.CreateAsync(request.Name, request.MarkId, Enum.Parse<TypeModel>(request.TypeModel));
        return CreatedAtAction(nameof(GetById), new { id = id }, null);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] ModelDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Name is required.");

        var updated = await _service.UpdateAsync(id, request.Name, request.MarkId, Enum.Parse<TypeModel>(request.TypeModel));
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