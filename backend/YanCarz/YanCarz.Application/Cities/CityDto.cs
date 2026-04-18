using System;

namespace YanCarz.Application.Cities;

public class CityDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }= string.Empty;
    public string CountryName { get; set; } = string.Empty;
}

public class CityCreateDto
{
    public string Name { get; set; }= string.Empty;
    public Guid CountryId { get; set; }
}


public class CityUpdateDto
{
    public string Name { get; set; }= string.Empty;
    public Guid CountryId { get; set; }
}

