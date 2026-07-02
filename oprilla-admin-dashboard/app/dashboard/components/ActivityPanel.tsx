"use client";

import { useEffect, useState } from "react";
import AIActivityCard from "./AIActivityCard";
import { getAIActivity } from "../services/dashboardService";

type AIActivity = {
  totalCalls: number;
  successfulBookings: number;
  failedBookings: number;
  pendingCalls: number;
};

export default function ActivityPanel() {
  const [activity, setActivity] = useState<AIActivity | null>(null);

  useEffect(() => {
    async function loadActivity() {
      try {
        const data = await getAIActivity();
        setActivity(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadActivity();
  }, []);

  if (!activity) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-start justify-between mb-8">
        <h2 className="text-[18px] font-serif font-semibold">
          AI Activity
        </h2>

        <div className="w-5 h-5 rounded-full border-2 border-[#A46A4D] flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#A46A4D]"></div>
        </div>
      </div>

      <div className="space-y-8">

        <AIActivityCard
          title="Total Calls"
          status="TODAY"
          statusBg="bg-blue-100"
          statusText="text-blue-700"
          dotColor="bg-blue-600"
          description={activity.totalCalls.toString()}
          footer="AI Calls"
        />

        <AIActivityCard
          title="Successful Bookings"
          status="SUCCESS"
          statusBg="bg-green-100"
          statusText="text-green-700"
          dotColor="bg-green-600"
          description={activity.successfulBookings.toString()}
          footer="Bookings"
        />

        <AIActivityCard
          title="Failed Bookings"
          status="FAILED"
          statusBg="bg-red-100"
          statusText="text-red-700"
          dotColor="bg-red-600"
          description={activity.failedBookings.toString()}
          footer="Bookings"
        />

        <AIActivityCard
          title="Pending Calls"
          status="PENDING"
          statusBg="bg-yellow-100"
          statusText="text-yellow-700"
          dotColor="bg-yellow-500"
          description={activity.pendingCalls.toString()}
          footer="Calls"
        />

      </div>
    </div>
  );
}