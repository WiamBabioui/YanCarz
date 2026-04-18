namespace YanCarz.API.Models
{
    public class CreateCountryRequest
    {
        // On ajoute = string.Empty; pour garantir que le nom n'est jamais Null
        public string Name { get; set; } = string.Empty;
    }
}