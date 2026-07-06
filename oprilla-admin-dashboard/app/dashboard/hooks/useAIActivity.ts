"use client";

import { useEffect, useState } from "react";
import { getAIActivity } from "../services/dashboardService";

export interface AIActivity {
  totalCalls: number;
  successfulBookings: number;
  failedBookings: number;
  pendingCalls: number;
}

export function useAIActivity() {
  const [activity, setActivity] = useState<AIActivity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const data = await getAIActivity();
        setActivity(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load AI activity. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchActivity();
  }, []);

  return {
    activity,
    loading,
    error,
  };
}