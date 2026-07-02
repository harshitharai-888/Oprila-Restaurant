const API_URL = "http://localhost:5232/api";


const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidW5pcXVlX25hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AcmVzdGF1cmFudC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImp0aSI6IjA3NzQzNzgxLWU2MDctNDM3Zi1hZTg3LTMxMjNlNDI1ZTgyNSIsIm5iZiI6MTc4Mjk3MTQ3NywiZXhwIjoxNzgzMDAwMjc3LCJpc3MiOiJSZXN0YXVyYW50QXBpIiwiYXVkIjoiUmVzdGF1cmFudENsaWVudCJ9.o3EYqtt9ZWPiV_y4ropFQBVlUGFRq-hogUdOJdFpuhY";

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

export async function getAIActivity() {
  const response = await fetch(
    `${API_URL}/admin/appointments/ai-activity`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch AI activity");
  }

  const result = await response.json();
  console.log("AI Activity:", result);
  return result.data;
}

export async function getWeeklyRevenue() {
  const response = await fetch(
    `${API_URL}/admin/appointments/weekly-revenue`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weekly revenue");
  }

  const result = await response.json();
  console.log(result);
  return result.data;
}