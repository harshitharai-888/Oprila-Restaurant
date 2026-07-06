"use client";

import { Calendar, CalendarDays, Clock3, Users } from "lucide-react";
import Header from "./Header";
import StatCard from "./StatCard";
import WeeklyRevenueChart from "./WeeklyRevenueChart";
import ActivityPanel from "./ActivityPanel";
import { useDashboard } from "../hooks/useDashboard";

export default function Dashboard() {
  const { dashboardData, loading } = useDashboard();

  if (loading || !dashboardData) {
    return <div>Loading...</div>;
  }

  const statCards = [
    {
      title: "TODAY'S BOOKINGS",
      value: dashboardData.totalToday.toString(),
      subtitle: "Today's bookings",
      icon: CalendarDays,
      borderColor: "border-l-black",
      subtitleColor: "text-gray-500",
    },
    {
      title: "THIS WEEK",
      value: dashboardData.totalThisWeek.toString(),
      subtitle: "This week's bookings",
      icon: Calendar,
      borderColor: "border-l-[#B96A45]",
      subtitleColor: "text-gray-500",
    },
    {
      title: "THIS MONTH",
      value: dashboardData.totalThisMonth.toString(),
      subtitle: "This month's bookings",
      icon: Clock3,
      borderColor: "border-l-black",
      subtitleColor: "text-[#C26D57]",
    },
    {
      title: "PENDING",
      value: dashboardData.pendingConfirmations.toString(),
      subtitle: "Pending confirmations",
      icon: Users,
      borderColor: "border-l-black",
      subtitleColor: "text-gray-500",
    },
  ];

  return (
    <main className="flex-1 overflow-y-auto bg-[#F8F7F4] px-8 py-8">
      <div className="w-full">
        <Header />

        <div className="mb-8">
          <h1 className="text-[36px] font-serif font-semibold text-[#2B2B2B]">
            Service Overview
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Welcome back, Julian. Here's what's happening today.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <StatCard
              key={card.title}
              title={card.title}
              value={card.value}
              subtitle={card.subtitle}
              icon={card.icon}
              borderColor={card.borderColor}
              subtitleColor={card.subtitleColor}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <WeeklyRevenueChart />
          </div>

          <div>
            <ActivityPanel />
          </div>
        </div>
      </div>
    </main>
  );
}