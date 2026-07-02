namespace RestaurantApi.Dashboard.Responses;

public class WeeklyRevenueResponse
{
    public string Day { get; set; } = string.Empty;
    public decimal Revenue { get; set; }
}