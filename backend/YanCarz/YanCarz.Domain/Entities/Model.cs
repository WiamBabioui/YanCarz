using YanCarz.Domain.Enums;

namespace YanCarz.Domain.Entities;

public class Model : Base
{
    public string Name { get; set; } = string.Empty;

    public TypeModel TypeModel { get; set; }

    public Guid MarkId { get; set; }
    public Mark? Mark { get; set; }
}