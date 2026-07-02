"use client";

import { useEffect, useState } from "react";

type WeeklyRevenue = {
  day: string;
  revenue: number;
};

export default function WeeklyRevenueChart() {
  const [revenueData, setRevenueData] = useState<WeeklyRevenue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRevenue() {
      try {
        const dashboardService = (await import("../services/dashboardService")) as any;
        const data =
          typeof dashboardService.getWeeklyRevenue === "function"
            ? await dashboardService.getWeeklyRevenue()
            : dashboardService.default &&
              typeof dashboardService.default.getWeeklyRevenue === "function"
            ? await dashboardService.default.getWeeklyRevenue()
            : typeof dashboardService.default === "function"
            ? await dashboardService.default()
            : [];

        console.log("Weekly Revenue:", data);

        if (Array.isArray(data)) {
          setRevenueData(data);
        } else {
          console.error("API did not return an array:", data);
          setRevenueData([]);
        }
      } catch (error) {
        console.error("Failed to load weekly revenue:", error);
      } finally {
        setLoading(false);
      }
    }

    loadRevenue();
  }, []);

  const currentDay = new Date()
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();

  const maxRevenue =
    revenueData.length > 0
      ? Math.max(...revenueData.map((d) => d.revenue), 1)
      : 1;

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 h-[420px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (revenueData.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 h-[420px] flex items-center justify-center">
        No revenue data found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 h-[420px]">
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[18px] font-serif font-semibold text-[#2B2B2B]">
          Weekly Revenue Trend
        </h2>

        <div className="flex items-center gap-2 text-[10px] text-gray-600">
          <div className="w-2 h-2 rounded-full bg-black"></div>
          <span>Revenue</span>
        </div>
      </div>

      
      <div className="flex items-end justify-between h-[250px] border-b border-gray-200 pb-3">
        {revenueData.map((item) => {
          const height =
            item.revenue === 0
              ? 4
              : Math.max((item.revenue / maxRevenue) * 180, 8);

          const isToday =
            item.day.substring(0, 3).toUpperCase() === currentDay;

          return (
            <div
              key={item.day}
              className="flex flex-col items-center flex-1"
            >
              <div
                className={`w-8 rounded-t ${
                  isToday ? "bg-[#A46A4D]" : "bg-[#2B2B2B]"
                }`}
                style={{ height: `${height}px` }}
              />

              <span className="text-[10px] text-gray-500 mt-2">
                ₹{item.revenue}
              </span>

              <span
                className={`text-[10px] mt-1 ${
                  isToday
                    ? "font-semibold text-black"
                    : "text-gray-400"
                }`}
              >
                {item.day.toUpperCase()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}