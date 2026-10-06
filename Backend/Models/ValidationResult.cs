namespace Backend.Models;

public class ValidationResult
{
    public int OverallScore { get; set; }

    public int ProblemScore { get; set; }

    public int MarketScore { get; set; }

    public int DifferentiationScore { get; set; }

    public int MonetizationScore { get; set; }

    public int TechnicalScore { get; set; }

    public int GoToMarketScore { get; set; }

    public string Summary { get; set; } = "";

    public string BiggestStrength { get; set; } = "";

    public string BiggestRisk { get; set; } = "";

    public string Recommendation { get; set; } = "";
}