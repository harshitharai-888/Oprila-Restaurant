const API_URL = "http://localhost:5232/api";


const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidW5pcXVlX25hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AcmVzdGF1cmFudC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImp0aSI6IjA2NDU1YzY2LTZiNTQtNGFkOS04YjU2LTI1ZjAyYWE4YWUxNiIsIm5iZiI6MTc4MzM1NDY2NCwiZXhwIjoxNzgzMzgzNDY0LCJpc3MiOiJSZXN0YXVyYW50QXBpIiwiYXVkIjoiUmVzdGF1cmFudENsaWVudCJ9.1Uj_BYBrAjYQfo9NJvncEIY8wg4O0E0CN1LwM7-B4EY";

async function fetchWithErrorHandling(endpoint: string) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Unable to load data. Please try again later.");
    }

     return await response.json();
  } catch {
    throw new Error("Unable to load data. Please try again later.");
  }
}

export async function getDashboardData() {
  return fetchWithErrorHandling("/admin/appointments/dashboard");
}

export async function getAIActivity() {
  const result = await fetchWithErrorHandling(
    "/admin/appointments/ai-activity"
  );

  return result.data;
}

export async function getWeeklyRevenue() {
  const result = await fetchWithErrorHandling(
    "/admin/appointments/weekly-revenue"
  );

  return result.data;
}