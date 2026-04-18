namespace YanCarz.Domain.Entities;

public class AgencyUser : Base
{
    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string EMail { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public string Telephone { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;


    public Guid AgencyId { get; set; }

    public Agency? Agency { get; set; }
}
