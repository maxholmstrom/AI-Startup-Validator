using Backend.Models;
using Backend.Services;
using DotNetEnv;

Env.Load();

var apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
var model = Environment.GetEnvironmentVariable("OPENAI_MODEL");
var endpoint = Environment.GetEnvironmentVariable("OPENAI_ENDPOINT");

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

builder.Services.AddHttpClient();

builder.Services.AddScoped<AiValidationService>();

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

app.MapPost("/api/startups/validate",
    async (Startup startup, AiValidationService aiService) =>
    {
        var result = await aiService.ValidateStartup(startup);

        if (result == null)
        {
            return Results.Problem("AI did not return a validation result.");
        }

        return Results.Ok(result);
    });

app.Run();