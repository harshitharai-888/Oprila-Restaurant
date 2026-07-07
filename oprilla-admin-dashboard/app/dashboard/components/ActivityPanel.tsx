import { useAIActivity } from "../hooks/useAIActivity";
import AIActivityCard from "./AIActivityCard";

export default function ActivityPanel() {
  const { activity, loading, error } = useAIActivity();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!activity) {
    return null;
  }

  const activityCards = [
    {
      title: "Total Calls",
      status: "TODAY",
      statusBg: "bg-blue-100",
      statusText: "text-blue-700",
      dotColor: "bg-blue-600",
      description: activity.totalCalls.toString(),
      footer: "AI Calls",
    },
    {
      title: "Successful Bookings",
      status: "SUCCESS",
      statusBg: "bg-green-100",
      statusText: "text-green-700",
      dotColor: "bg-green-600",
      description: activity.successfulBookings.toString(),
      footer: "Bookings",
    },
    {
      title: "Failed Bookings",
      status: "FAILED",
      statusBg: "bg-red-100",
      statusText: "text-red-700",
      dotColor: "bg-red-600",
      description: activity.failedBookings.toString(),
      footer: "Bookings",
    },
    {
      title: "Pending Calls",
      status: "PENDING",
      statusBg: "bg-yellow-100",
      statusText: "text-yellow-700",
      dotColor: "bg-yellow-500",
      description: activity.pendingCalls.toString(),
      footer: "Calls",
    },
  ];

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
      {activityCards.map((card) => (
        <AIActivityCard
          key={card.title}
          title={card.title}
          status={card.status}
          statusBg={card.statusBg}
          statusText={card.statusText}
          dotColor={card.dotColor}
          description={card.description}
          footer={card.footer}
        />
      ))}
    </div>
  </div>
);
}