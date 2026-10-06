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

app.MapPost("/api/startups/validate", (Startup startup) =>
{
    var result = new ValidationResult
    {
        OverallScore = 78,
        ProblemScore = 8,
        MarketScore = 7,
        DifferentiationScore = 6,
        MonetizationScore = 7,
        TechnicalScore = 9,
        GoToMarketScore = 6,

        Summary = "The startup solves a clear problem and has potential.",

        BiggestStrength = "The idea has a clear value proposition.",

        BiggestRisk = "The market may already contain strong competitors.",

        Recommendation = "Validate the problem with potential customers before building the full product."
    };

    return result;
});

app.Run();