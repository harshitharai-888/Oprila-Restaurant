export const getDashboardData = () => {
  return {
    bookings: 0,
    activeCalls: 0,
    occupancy: "85%",
    customers: 12,
  };
};

export const getRecentActivities = () => {
  return [
    {
      title: "Booking Confirmed",
      description: "Table for 4 reserved at 8:00 PM",
      time: "5 minutes ago",
    },
    {
      title: "New Customer Registered",
      description: "Customer account created successfully",
      time: "20 minutes ago",
    },
    {
      title: "Reservation Rescheduled",
      description: "Booking moved from 7:30 PM to 8:15 PM",
      time: "1 hour ago",
    },
  ];
const API_URL = "http://localhost:5232/api";

export const getRecentActivities = async () => {
  const res = await fetch(`${API_URL}/dashboard/recent-activity`);

  if (!res.ok) {
    throw new Error("Failed to fetch recent activities");
  }

  const json = await res.json();

  // backend response: { success, message, data }
  return json.data;
};