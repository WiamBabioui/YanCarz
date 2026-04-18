using Microsoft.AspNetCore.Mvc;
using YanCarz.Application.Marks;

namespace YanCarz.API.Controllers.Shared
{
    [ApiController]
    [Route("api/shared/[controller]")]
    [ApiExplorerSettings(GroupName = "shared")]

    public class MarkController : ControllerBase
    {
        private readonly MarkService _service;

        public MarkController(MarkService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<MarkDto>>> GetAll() => Ok(await _service.GetAllAsync());

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<MarkDto>> GetById(Guid id)
        {
            var mark = await _service.GetByIdAsync(id);
            if (mark == null) return NotFound();
            return Ok(mark);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] string name)
        {
            if (string.IsNullOrWhiteSpace(name)) return BadRequest("Mark name is required.");
            var id = await _service.CreateAsync(name);
            return CreatedAtAction(nameof(GetById), new { id }, null);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] MarkDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Name)) return BadRequest("Mark name is required.");
            var updated = await _service.UpdateAsync(id, request.Name);
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
}