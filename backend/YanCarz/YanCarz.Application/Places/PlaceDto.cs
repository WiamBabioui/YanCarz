namespace YanCarz.Application.Places;

public class PlaceDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public Guid CountryId { get; set; }
}

public class PlaceCreateDto
{
    public string Name { get; set; } = string.Empty;
    public Guid CountryId { get; set; }
}

public class PlaceUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public Guid CountryId { get; set; }
}
