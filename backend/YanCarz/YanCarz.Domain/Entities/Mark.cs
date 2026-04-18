namespace YanCarz.Domain.Entities;

public class Mark : Base
{
    public string Name { get; set; } = string.Empty;

    public List<Model> Models { get; set; } = new();
}
