namespace Backend.Models;

public class Startup
{
    public int Id { get; set; }

    public string Name { get; set; } = "";

    public string Description { get; set; } = "";

    public string Problem { get; set; } = "";

    public string TargetCustomer { get; set; } = "";

    public string BusinessModel { get; set; } = "";
}