using System;
using System.Collections.Generic;
using System.Text;

namespace YanCarz.Domain.Entities
{
    public abstract class Base
    {
        public Guid Id { get; protected set; }

        public DateTime CreatedAt { get; protected set; }

        protected Base()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
        }
    }
}
