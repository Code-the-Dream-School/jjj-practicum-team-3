"use client";

import CalendarStrip from "@/components/shared/layout/CalendarStrip";
import Footer from "@/components/shared/layout/Footer";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IMovie, IShowtimeGroup, ITheater } from "@/interfaces";
import { getMovieById } from "@/actions/movies";
import { getShowtimesByMovieId } from "@/actions/showtimes";
import { useBookingStore } from "@/lib/store/bookingStore";

export default function MoviePage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = React.use(params);
    const [movie, setMovie] = useState<IMovie | null>(null);
    const [showtimes, setShowtimes] = useState<IShowtimeGroup[]>([]);
    const [dateFilter, setDateFilter] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { setSelection } = useBookingStore();

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                setError(null);

                const movieResult = await getMovieById(unwrappedParams.id);
                if (movieResult.success) {
                    console.log("Movie data:", movieResult.data);
                    setMovie(movieResult.data);
                } else {
                    console.log("Movie error:", movieResult.message);
                    setError(movieResult.message);
                }

                const showtimesResult = await getShowtimesByMovieId(unwrappedParams.id, dateFilter || undefined);
                if (showtimesResult.success) {
                    console.log("Showtimes data with dateFilter:", dateFilter, showtimesResult.data);
                    setShowtimes(showtimesResult.data);
                } else {
                    console.log("Showtimes error:", showtimesResult.message);
                    setError(showtimesResult.message);
                }
            } catch (err) {
                setError("Failed to fetch data");
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [unwrappedParams.id, dateFilter]);

    const handleDateChange = (date: Date) => {
        const formattedDate = date.toISOString().split("T")[0]; // Use ISO date without time
        console.log("Selected date (ISO):", formattedDate);
        setDateFilter(formattedDate);
    };

    const handleShowtimeClick = (theater: ITheater, show: { id: string; date: string; time: string; ticket_price: number }) => {
        console.log("Selected showtime before setSelection:", { theater, show });
        setSelection({
            movie,
            theater,
            showtimeId: show.id,
            date: show.date, // Should be "2025-09-23"
            time: show.time,
            ticketPrice: show.ticket_price,
        });
        console.log("Selection set to:", { movie, theater, showtimeId: show.id, date: show.date, time: show.time, ticketPrice: show.ticket_price });
        router.push(`/seat-selection`);
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#0f121a] text-[#e7eaf3] px-4 py-10 md:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl rounded-2xl border border-[#2b3450] bg-[#1b2030] p-8">
                    <h1 className="text-2xl font-extrabold">Loading...</h1>
                </div>
                <Footer />
            </main>
        );
    }

    if (error || !movie) {
        return (
            <main className="min-h-screen bg-[#0f121a] text-[#e7eaf3] px-4 py-10 md:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl rounded-2xl border border-[#2b3450] bg-[#1b2030] p-8">
                    <h1 className="text-2xl font-extrabold">Movie not found</h1>
                    <p className="mt-2 text-[#a3acc2]">
                        {error || `We couldn't find a movie with id ${unwrappedParams.id}.`}
                    </p>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0f121a] text-[#e7eaf3] px-4 py-8 md:px-6 lg:px-8 space-y-8">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <input
                    type="text"
                    placeholder="Enter Location"
                    className="w-full md:w-1/3 bg-gray-700 text-gray-200 p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Movie"
                    className="w-full md:w-1/3 bg-gray-700 text-gray-200 p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Theater"
                    className="w-full md:w-1/3 bg-gray-700 text-gray-200 p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <section className="mx-auto max-w-6xl">
                <CalendarStrip
                    days={14}
                    onChange={handleDateChange}
                    className="mt-2"
                />
            </section>

            <section className="mx-auto max-w-6xl rounded-2xl border border-[#2b3450] bg-[#1b2030] p-6 md:p-8">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 w-full">
                        <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-full h-full object-cover md:rounded-l-2xl md:rounded-tr-none"
                        />
                    </div>

                    <div className="p-6 md:p-8 flex-1 space-y-3">
                        <h1 className="text-2xl font-extrabold leading-tight">
                            {movie.title}{" "}
                            <span className="font-semibold text-[#8b93a7]">
                ({movie.year})
              </span>
                        </h1>
                        <p className="text-sm font-medium text-[#a3acc2]">
                            {movie.runtime}
                        </p>
                        <p className="leading-relaxed text-[#cfd5e6]">
                            {movie.description}
                        </p>
                        <div className="grid gap-1 pt-1 text-[#cfd5e6]">
                            <p>
                                <span className="font-semibold">GENRE:</span>{" "}
                                {Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre}
                            </p>
                            {movie.director && (
                                <p>
                                    <span className="font-semibold">DIRECTOR:</span>{" "}
                                    {movie.director}
                                </p>
                            )}
                            {movie.actors && (
                                <p>
                                    <span className="font-semibold">ACTORS:</span> {movie.actors}
                                </p>
                            )}
                            {movie.country && (
                                <p>
                                    <span className="font-semibold">COUNTRY:</span> {movie.country}
                                </p>
                            )}
                            {movie.release_date && (
                                <p>
                                    <span className="font-semibold">RELEASE DATE:</span>{" "}
                                    {new Date(movie.release_date).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-extrabold tracking-tight">Showtimes</h2>
                    <span className="rounded-full bg-[#e8eefc] px-3 py-1 text-xs font-extrabold text-[#0c1222]">
            {movie.comingsoon ? "coming soon" : "now showing"}
          </span>
                </div>

                <div className="divide-y divide-[#2b3450]">
                    {showtimes.length === 0 ? (
                        <p className="text-[#a3acc2] py-4">
                            No showtimes available{movie.comingsoon ? " (coming soon)" : ""}
                        </p>
                    ) : (
                        showtimes.map((t) => (
                            <div
                                key={t.theater.id}
                                className="flex flex-col gap-3 py-4 md:grid md:grid-cols-[1fr,auto] md:items-start"
                            >
                                <div>
                                    <p className="m-0 text-base font-extrabold text-[#e7eaf3]">
                                        {t.theater.name}
                                    </p>
                                    <p className="m-0 text-sm text-[#a3acc2]">
                                        {t.theater.address}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-4 md:justify-end">
                                    {t.shows.map((show, index) => (
                                        <button
                                            key={`${t.theater.id}-${show.id}-${index}`}
                                            onClick={() => handleShowtimeClick(t.theater, show)}
                                            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-extrabold text-white transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                                            style={{
                                                backgroundColor: "#F05A3B",
                                                boxShadow: "0 4px 0 0 #B8402B",
                                            }}
                                            onMouseDown={(e) => {
                                                e.currentTarget.style.transform = "translateY(1px)";
                                                e.currentTarget.style.boxShadow = "0 2px 0 0 #B8402B";
                                            }}
                                            onMouseUp={(e) => {
                                                e.currentTarget.style.transform = "";
                                                e.currentTarget.style.boxShadow = "0 4px 0 0 #B8402B";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "";
                                                e.currentTarget.style.boxShadow = "0 4px 0 0 #B8402B";
                                            }}
                                            disabled={movie.comingsoon}
                                        >
                                            {show.time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            <div className="w-full mt-8 mb-8">
                <img
                    src="/footerStrip.png"
                    alt="Footer strip"
                    className="w-full h-auto object-cover rounded-xl shadow-lg"
                />
            </div>
        </main>
    );
}
