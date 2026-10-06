using Backend.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("React", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("React");

var startups = new List<Startup>();

app.MapGet("/", () => "Backend is running!");

app.MapGet("/api/startups", () =>
{
    return startups;
});

app.MapPost("/api/startups", (Startup startup) =>
{
    startup.Id = startups.Count + 1;

    startups.Add(startup);

    return startup;
});

app.Run();