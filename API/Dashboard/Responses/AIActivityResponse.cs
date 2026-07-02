namespace RestaurantApi.Dashboard.Responses;

public class AIActivityResponse
{
    public int TotalCalls { get; set; }
    public int SuccessfulBookings { get; set; }
    public int FailedBookings { get; set; }
    public int PendingCalls { get; set; }
}