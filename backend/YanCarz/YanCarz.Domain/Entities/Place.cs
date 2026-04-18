using System;
using System.Collections.Generic;
using System.Text;

namespace YanCarz.Domain.Entities
{
    public class Place : Base
    {
        public string Name { get; set; } = string.Empty;
        public Guid CountryId { get; set; }
        public Country? Country { get; private set; }
    }
}
