"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IUsersStore, useUsersStore } from "@/lib/store/usersStore";

// Types
type UserDashboardData = {
  totalBookings: number;
  totalMoviesWatched: number;
  totalTicketsBooked: number;
  totalAmountSpent: number;
};

export default function UserDashboardPage() {
  const { user } = useUsersStore() as IUsersStore; // ✅ get logged-in user
  const [dashboardData, setDashboardData] = useState<UserDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!user?.id) return; // 🚦 wait until login fills store

      try {
        setLoading(true);
        const res = await fetch(`/api/users/${user.id}/dashboard`, {
          credentials: "include",
        });
        const response = await res.json();

        if (response.success) {
          setDashboardData(response.data);
        } else {
          setError(response.message || "Failed to fetch dashboard data");
          toast.error(response.message || "Failed to fetch dashboard data");
        }
      } catch (err: any) {
        setError(err.message);
        toast.error("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user]);

  if (loading) return <div className="p-6 text-[#a3acc2]">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!dashboardData) return <div className="p-6 text-[#a3acc2]">No data</div>;

  // format currency
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  return (
    <main className="min-h-screen bg-[#0f121a] text-[#e7eaf3] px-4 py-6 md:px-6 lg:px-8">
      {/* Top Stats */}
      <section className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Bookings" value={dashboardData.totalBookings ?? 0} />
        <StatCard title="Movies Watched" value={dashboardData.totalMoviesWatched ?? 0} />
        <StatCard title="Tickets Booked" value={dashboardData.totalTicketsBooked ?? 0} />
        <StatCard title="Amount Spent" value={formatCurrency(dashboardData.totalAmountSpent ?? 0)} />
      </section>
    </main>
  );
}

/* --- Inline UI Component --- */
function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-[#2b3450] bg-[#1b2030] p-4">
      <div className="text-sm font-bold text-[#a3acc2]">{title}</div>
      <div className="mt-2 text-2xl font-extrabold text-[#e7eaf3]">{value}</div>
    </div>
  );
}