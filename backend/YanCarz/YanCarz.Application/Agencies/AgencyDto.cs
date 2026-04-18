
namespace YanCarz.Application.Agencies;

public class AgencyCreateDto
{
    public string Name { get; set; } = string.Empty;
    public string EMail { get; set; } = string.Empty;
    public string NbrPhone { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FirstMame { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public Guid IdCity { get; set; }
}

public class AgencyDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string EMail { get; set; } = string.Empty;
    public string NbrPhone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
}

