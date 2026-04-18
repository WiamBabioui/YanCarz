using YanCarz.Domain.ValueObjects; 


namespace YanCarz.Domain.Entities
{
    public class Agency : Base
    {
        public string Name { get; set; } = string.Empty;
        public string EMAil { get; set; } = string.Empty;
        public string SiteWeb { get; set; } = string.Empty;
        public string NbrPhone { get; set; } = string.Empty;

        public Address Address { get; set; } = new();
        public List<AgencyUser> AgencyUsers { get; set; } = new List<AgencyUser>();
        public List<AgencyCar> Cars { get; set; } = new List<AgencyCar>();

    }
}