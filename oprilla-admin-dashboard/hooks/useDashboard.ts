import { useEffect, useState } from "react";

import {
  getRecentActivities,
  getConversationTranscript,
  RecentActivity,
  ConversationTranscript,
} from "../app/dashboard/services/dashboardService";

export function useRecentActivities() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getRecentActivities();
        setActivities(data);
      } catch (error) {
        console.error("Failed to fetch activities", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return {
    activities,
    loading,
  };
}

export function useConversationTranscript() {
  const [conversations, setConversations] = useState<ConversationTranscript[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConversationTranscript()
      .then((data) => setConversations(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return {
    conversations,
    loading,
  };
}