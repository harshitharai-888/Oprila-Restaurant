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

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await getDashboardData();
        setDashboardData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  return {
    dashboardData,
    loading,
  };
}