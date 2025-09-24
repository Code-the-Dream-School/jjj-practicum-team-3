"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"; 

// Types
type Movie = { id: string; title: string; genre: string };

type DashboardData = {
  totalMovies: number;
  newUsersThisWeek: number;
  mostPopularGenre: string;
  totalRevenue: number;
  movies: Movie[];
  moviesByGenre: { genre: string; count: number }[];
  weeklySignups: { week: string; users: number }[];
};

export default function AdminDashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/dashboard");
        const response = await res.json();

        if (response.success) {
          setDashboardData(response.data || {});
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
  }, []);

  if (loading) return <div className="p-6 text-[#a3acc2]">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!dashboardData) return <div className="p-6 text-[#a3acc2]">No data</div>;

  const movies = dashboardData.movies || [];
  const moviesByGenre = dashboardData.moviesByGenre || [];
  const weeklySignups = dashboardData.weeklySignups || [];

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  return (

    <main className="min-h-screen bg-[#0f121a] text-[#e7eaf3] px-4 py-6 md:px-6 lg:px-8">
      {/* Page Title */}
    <div className="mx-auto max-w-6xl mb-8">
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#e7eaf3]">
          Dashboard
      </h1>
    </div>

      {/* Top Stats */}
      <section className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Movies" value={dashboardData.totalMovies ?? 0} />
        <StatCard title="New Users (This Week)" value={dashboardData.newUsersThisWeek ?? 0} />
        <StatCard title="Most Popular Genre" value={dashboardData.mostPopularGenre || "N/A"} />
        <StatCard title="Total Revenue" value={formatCurrency(dashboardData.totalRevenue ?? 0)} />
      </section>

      {/* Movies Table */}
      <section className="mx-auto max-w-6xl mb-6">
        <h2 className="mb-3 text-sm font-extrabold tracking-wide text-[#a3acc2]">
          Movies (Currently Playing)
        </h2>
        <div className="overflow-x-auto rounded-lg border border-[#2b3450] bg-[#1b2030]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#2b3450] text-[#a3acc2]">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Genre</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.length > 0 ? (
                movies.map((m) => (
                  <tr key={m.id} className="border-b border-[#2b3450]">
                    <td className="p-3">{m.title}</td>
                    <td className="p-3">{m.genre}</td>
                    <td className="p-3">
                      <Button size="sm" variant="outline">Edit</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-3 text-[#a3acc2]">
                    No movies currently playing
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Charts */}
<section className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Movies by Genre */}
  <div className="rounded-lg border border-[#2b3450] bg-[#1b2030] p-4 text-[#a3acc2]">
    <h3 className="mb-2 text-sm font-bold">Movies by Genre</h3>
    {moviesByGenre.length > 0 ? (
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={moviesByGenre}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2b3450" />
          <XAxis dataKey="genre" stroke="#a3acc2" />
          <YAxis stroke="#a3acc2" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1b2030", border: "1px solid #2b3450" }}
            labelStyle={{ color: "#a3acc2" }}
          />
          <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    ) : (
      <p className="text-xs text-[#a3acc2]">No genre data available</p>
    )}
  </div>

  {/* Weekly Signups */}
  <div className="rounded-lg border border-[#2b3450] bg-[#1b2030] p-4 text-[#a3acc2]">
    <h3 className="mb-2 text-sm font-bold">Weekly Signups</h3>
    {weeklySignups.length > 0 ? (
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={weeklySignups}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2b3450" />
          <XAxis dataKey="week" stroke="#a3acc2" />
          <YAxis stroke="#a3acc2" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1b2030", border: "1px solid #2b3450" }}
            labelStyle={{ color: "#a3acc2" }}
          />
          <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} dot />
        </LineChart>
      </ResponsiveContainer>
    ) : (
      <p className="text-xs text-[#a3acc2]">No signup data available</p>
    )}
  </div>
</section>
    </main>
  );
}

/* --- Inline UI Components --- */
function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-[#2b3450] bg-[#1b2030] p-4">
      <div className="text-sm font-bold text-[#a3acc2]">{title}</div>
      <div className="mt-2 text-2xl font-extrabold text-[#e7eaf3]">{value}</div>
    </div>
  );
}

function Button({
  children,
  variant = "default",
  size = "default",
  onClick,
  disabled,
}: React.PropsWithChildren<{
  variant?: "default" | "outline" | "danger";
  size?: "default" | "sm" | "lg";
  onClick?: () => void;
  disabled?: boolean;
}>) {
  const base =
    "inline-flex items-center justify-center font-bold rounded-md transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6AA6FF]/40 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: Record<string, string> = {
    default: "bg-[#6AA6FF] text-[#0c1222] hover:bg-[#5a8ce0]",
    outline:
      "border border-[#2b3450] bg-transparent text-[#cfd5e6] hover:border-[#3a4669] hover:bg-[#111726]",
    danger: "bg-[#F05A3B] text-[#0c1222] hover:bg-[#d94c30]",
  };
  const sizes: Record<string, string> = {
    sm: "h-8 px-3 text-xs",
    default: "h-9 px-4 text-sm",
    lg: "h-11 px-6 text-base",
  };
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={[base, variants[variant], sizes[size]].join(" ")}
    >
      {children}
    </button>
  );
}