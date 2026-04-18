using System.ComponentModel.DataAnnotations.Schema;

namespace YanCarz.Domain.Entities
{
    public class Devise(string code, string name) : Base
    {
        public string Code { get; set; } = code; 
        public string Name { get; set; } = name; 
    }
}