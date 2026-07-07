import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboardService";

interface DashboardData {
  totalToday: number;
  totalThisWeek: number;
  totalThisMonth: number;
  pendingConfirmations: number;
}

export function useDashboard() {
  const [dashboardData, setDashboardData] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await getDashboardData();
        setDashboardData(response.data);
        setError(null);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load dashboard data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  return {
    dashboardData,
    loading,
    error,
  };
}