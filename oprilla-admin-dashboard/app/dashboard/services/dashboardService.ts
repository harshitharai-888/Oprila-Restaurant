const API_URL = "http://localhost:5232/api";


const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidW5pcXVlX25hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AcmVzdGF1cmFudC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImp0aSI6IjVkM2Q4OTI0LWQ5OGItNDc4ZC1hZDQzLWQ5NDdlYzVjYmQ2ZCIsIm5iZiI6MTc4MjgyNjQ0NywiZXhwIjoxNzgyODU1MjQ3LCJpc3MiOiJSZXN0YXVyYW50QXBpIiwiYXVkIjoiUmVzdGF1cmFudENsaWVudCJ9.eHbuCvyubQOtkmk5cS4fvzuKzXWQL5rZFksuHR2J3cA";

export async function getDashboardData() {
  const response = await fetch(
    `${API_URL}/admin/appointments/dashboard`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return response.json();
}