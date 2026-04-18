using Xunit;
using YanCarz.Domain.Entities;

namespace YanCarz.Tests
{
    public class VehicleValidationTests
    {
        [Fact]
        public void Vehicle_Initialization_Should_Work()
        {
            var vehicle = new Vehicle();
            vehicle.Brand = "Dacia";
            vehicle.Model = "Duster";
            Assert.NotNull(vehicle);
            Assert.Equal("Dacia", vehicle.Brand);
        }
    }
}