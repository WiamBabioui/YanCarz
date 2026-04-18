namespace YanCarz.Domain.Entities
{
    public class User(string name, string email, string password) : Base
    {
        public string Name { get; set; } = name;

        public string Email { get; set; } = email;

        public string Password { get; set; } = password;
    }
}