"use client";

import CalendarStrip from "@/components/shared/layout/CalendarStrip";
import Footer from "@/components/shared/layout/Footer";
import React, { useEffect, useState } from "react";
import { IMovie, IShowtimeGroup } from "@/interfaces";
import { getMovieById } from "@/actions/movies";
import { getShowtimesByMovieId } from "@/actions/showtimes";

export default function MoviePage({ params }: { params: { id: string } }) {
    const [movie, setMovie] = useState<IMovie | null>(null);
    const [showtimes, setShowtimes] = useState<IShowtimeGroup[]>([]);
    const [dateFilter, setDateFilter] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                setError(null);

                // Fetch movie
                const movieResult = await getMovieById(params.id);
                if (movieResult.success) {
                    console.log("Movie data:", movieResult.data);
                    setMovie(movieResult.data);
                } else {
                    console.log("Movie error:", movieResult.message);
                    setError(movieResult.message);
                }

                // Fetch showtimes
                const showtimesResult = await getShowtimesByMovieId(params.id, dateFilter || undefined);
                if (showtimesResult.success) {
                    console.log("Showtimes data:", showtimesResult.data);
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
    }, [params.id, dateFilter]);

    const handleDateChange = (date: Date) => {
        const formattedDate = date.toISOString().split("T")[0]; // e.g., "2025-09-21"
        console.log("Selected date:", formattedDate);
        setDateFilter(formattedDate);
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
                        {error || `We couldn’t find a movie with id ${params.id}.`}
                    </p>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0f121a] text-[#e7eaf3] px-4 py-8 md:px-6 lg:px-8 space-y-8">
            {/* Input section placeholder */}
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

            {/* CALENDAR */}
            <section className="mx-auto max-w-6xl">
                <CalendarStrip
                    days={14}
                    onChange={handleDateChange}
                    className="mt-2"
                />
            </section>

            {/* ABOUT THE MOVIE */}
            <section className="mx-auto max-w-6xl rounded-2xl border border-[#2b3450] bg-[#1b2030] p-6 md:p-8">
                <div className="flex flex-col md:flex-row">
                    {/* Poster */}
                    <div className="md:w-1/3 w-full">
                        <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-full h-full object-cover md:rounded-l-2xl md:rounded-tr-none"
                        />
                    </div>

                    {/* Info */}
                    <div className="p-6 md:p-8 flex-1 space-y-3">
                        <h1 className="text-2xl font-extrabold leading-tight">
                            {movie.title}{" "}
                            <span className="font-semibold text-[#8b93a7]">
                ({movie.year})
              </span>
                        </h1>
                        <p className="text-sm font-medium text-[#a3acc2]">
                            {movie.runTime}
                        </p>
                        <p className="leading-relaxed text-[#cfd5e6]">
                            {movie.description}
                        </p>
                        <div className="grid gap-1 pt-1 text-[#cfd5e6]">
                            <p>
                                <span className="font-semibold">GENRE:</span> {movie.genre}
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
                        </div>
                    </div>
                </div>

                {/* SHOWTIMES */}
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
                                {/* LEFT PART ADDRESS */}
                                <div>
                                    <p className="m-0 text-base font-extrabold text-[#e7eaf3]">
                                        {t.theater.name}
                                    </p>
                                    <p className="m-0 text-sm text-[#a3acc2]">
                                        {t.theater.address}
                                    </p>
                                </div>

                                {/* RIGHT PART TIME */}
                                <div className="flex flex-wrap gap-4 md:justify-end">
                                    {t.shows.map((show, index) => (
                                        <a
                                            key={`${t.theater.id}-${show.time}-${index}`}
                                            href="#"
                                            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-extrabold text-white transition-transform"
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
                                        >
                                            {show.time}
                                        </a>
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
