'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useBookingStore } from '@/lib/store/bookingStore';
import FooterStrip from '@/components/shared/layout/FooterStrip';
import CalendarStrip from '@/components/shared/layout/CalendarStrip';
import { ITheater, IShowtimes } from '@/interfaces/index';

export default function TheaterResults() {
    const searchParams = useSearchParams();
    const theaterId = searchParams.get('theaterId');
    const [theater, setTheater] = useState<ITheater | null>(null);
    const [dateFilter, setDateFilter] = useState<string>(new Date().toISOString().split('T')[0]);
    const [movieFilter, setMovieFilter] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { setSelection } = useBookingStore();

    useEffect(() => {
        if (!theaterId) {
            setError('Missing theater ID');
            setLoading(false);
            return;
        }

        const fetchTheater = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/theaters/${theaterId}`);
                if (!response.ok) {
                    const { error } = await response.json();
                    setError(error || 'Failed to fetch theater');
                    return;
                }
                const data: ITheater = await response.json();
                setTheater(data);
            } catch (err) {
                setError('Failed to fetch theater');
            } finally {
                setLoading(false);
            }
        };
        fetchTheater();
    }, [theaterId]);

    const filteredMovies = theater
        ? theater.movies
            .filter((movie) => movie.title.toLowerCase().includes(movieFilter.toLowerCase()))
            .map((movie) => ({
                ...movie,
                showtimes: movie.showtimes.filter((st) => st.date === dateFilter && st.is_active),
            }))
            .filter((movie) => movie.showtimes.length > 0)
        : [];

    const handleDateChange = (date: Date) => {
        const formattedDate = date.toISOString().split('T')[0];
        console.log('Selected date (ISO):', formattedDate);
        setDateFilter(formattedDate);
    };

    const handleShowtimeClick = (showtime: IShowtimes) => {
        if (!theater) return;
        setSelection({
            movie: {
                id: showtime.movie_id,
                title: showtime.movie?.title || 'Unknown title',
                poster: showtime.movie?.poster || '/placeholder.png',
            },
            theater: {
                id: theater.id,
                name: theater.name,
            },
            showtimeId: showtime.id,
            date: showtime.date,
            time: showtime.time,
            ticketPrice: showtime.ticket_price,
        });
        console.log('Selection set to:', {
            movie: { id: showtime.movie_id, title: showtime.movie?.title, poster: showtime.movie?.poster },
            theater: { id: theater.id, name: theater.name },
            showtimeId: showtime.id,
            date: showtime.date,
            time: showtime.time,
            ticketPrice: showtime.ticket_price,
        });
        router.push('/seat-selection');
    };

    if (loading) {
        return (
            <div className="bg-[#151925] min-h-screen text-white">
                <div className="text-center py-10">Loading theater...</div>
            </div>
        );
    }

    if (error || !theater) {
        return (
            <div className="bg-[#151925] min-h-screen text-white">
                <div className="text-center py-10 text-red-500">{error || 'Theater not found'}</div>
            </div>
        );
    }

    return (
        <div className="bg-[#151925] min-h-screen text-white">
            <div className="w-full mb-2">
                <img src="/strip.png" alt="Movie strip" className="w-full h-auto object-cover rounded-xl shadow-lg" />
            </div>
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
                    value={movieFilter}
                    onChange={(e) => setMovieFilter(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Theater"
                    className="w-full md:w-1/3 bg-gray-700 text-gray-200 p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <section className="mx-auto max-w-6xl">
                    <CalendarStrip days={14} onChange={handleDateChange} className="mt-2" />
                </section>
                <div className="space-y-6 bg-[#D9D9D9] rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl text-black font-bold">{theater.name}</h2>
                    <h3 className="text-xl text-gray-500">{theater.address}</h3>
                    {filteredMovies.length === 0 ? (
                        <p className="text-center text-gray-400">No showtimes available for {dateFilter}</p>
                    ) : (
                        filteredMovies.map((movie) => (
                            <div
                                key={movie.title}
                                className="bg-[#FFFAFA] rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6"
                            >
                                <img
                                    src={movie.showtimes[0]?.movie.poster || '/placeholder.png'}
                                    alt="Movie Poster"
                                    className="w-24 h-36 rounded-xl shadow-md flex-shrink-0"
                                />
                                <div className="flex-grow flex flex-col items-center md:items-start text-center md:text-left">
                                    <h3 className="text-2xl font-bold text-black">{movie.title}</h3>
                                    <p className="text-gray-400">{movie.showtimes[0]?.movie.runtime || 'Unknown runtime'}</p>
                                    <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                                        {movie.showtimes.map((showtime) => (
                                            <button
                                                key={showtime.id}
                                                onClick={() => handleShowtimeClick(showtime)}
                                                className="bg-[#ff6f61] text-white font-medium py-2 px-2 shadow-md hover:bg-red-500 transition duration-300 transform hover:scale-105"
                                            >
                                                {showtime.time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
            <FooterStrip />
        </div>
    );
}
