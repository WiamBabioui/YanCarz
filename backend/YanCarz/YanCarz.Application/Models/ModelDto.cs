namespace YanCarz.Application.Models;

public class ModelDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string TypeModel { get; set; } = string.Empty;
    public Guid MarkId { get; set; }
    public string MarkName { get; set; } = string.Empty; 
}