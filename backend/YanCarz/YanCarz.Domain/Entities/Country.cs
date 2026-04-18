
using System.ComponentModel.DataAnnotations.Schema;

namespace YanCarz.Domain.Entities
{
    [Table("Country")]
    public class Country(string name) : Base
    {
        public string Name { get; set; } = name;

        public List<City> Cities { get; set; } = new List<City>();
    }
}