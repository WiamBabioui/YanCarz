using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;
using YanCarz.Application.Agencies;
using YanCarz.Application.AgencyCars;
using YanCarz.Application.Cities;
using YanCarz.Application.Countries;
using YanCarz.Application.Marks;
using YanCarz.Application.Models;
using YanCarz.Application.Places;
using YanCarz.Application.ResearchRequest;
using YanCarz.Domain.Interfaces;
using YanCarz.Infrastructure.Data;
using YanCarz.Infrastructure.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsAllowAll", policy =>
    {
        policy.AllowAnyOrigin() // Allow all origins
              .AllowAnyMethod() // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
              .AllowAnyHeader(); // Allow all headers
    });
});

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("admin", new OpenApiInfo { Title = "Admin API", Version = "v1" });
    options.SwaggerDoc("portal", new OpenApiInfo { Title = "Portal API", Version = "v1" });
    options.SwaggerDoc("agency", new OpenApiInfo { Title = "agency API", Version = "v1" });
    options.SwaggerDoc("shared", new OpenApiInfo { Title = "Shared API", Version = "v1" });
});

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<YanCarzDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));


builder.Services.AddScoped<ICountryRepository, CountryRepository>();
builder.Services.AddScoped<ICityRepository, CityRepository>();
builder.Services.AddScoped<IPlaceRepository, PlaceRepository>();
builder.Services.AddScoped<IMarkRepository, MarkRepository>();
builder.Services.AddScoped<IAgencyRepository, AgencyRepository>();
builder.Services.AddScoped<IAgencyUserRepository, AgencyUserRepository>();
builder.Services.AddScoped<IModelRepository, ModelRepository>();
builder.Services.AddScoped<IAgencyCarRepository, AgencyCarRepository>();
builder.Services.AddScoped<IResearchRequestRepository, ResearchRequestRepository>();

builder.Services.AddScoped<CountryService>();
builder.Services.AddScoped<CityService>();
builder.Services.AddScoped<PlaceService>();
builder.Services.AddScoped<MarkService>();
builder.Services.AddScoped<AgencyService>();
builder.Services.AddScoped<AgencyCarService>();
builder.Services.AddScoped<ModelService>();
builder.Services.AddScoped<ResearchRequestService>();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

 
}   
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/admin/swagger.json", "Admin API");
    options.SwaggerEndpoint("/swagger/portal/swagger.json", "Portal API");
    options.SwaggerEndpoint("/swagger/agency/swagger.json", "agency API");
    options.SwaggerEndpoint("/swagger/shared/swagger.json", "Shared API");
});


app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("CorsAllowAll");

app.MapControllers();


app.Run();


