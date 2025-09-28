'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBookingStore } from '@/lib/store/bookingStore';
import FooterStrip from '@/components/shared/layout/FooterStrip';
import CalendarStrip from '@/components/shared/layout/CalendarStrip';
import { ITheater, ITheaterWithDistance, IShowtimes } from '@/interfaces/index';

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
};

const TheatersByLocationPage = () => {
    const queryParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const lat = queryParams.get('lat');
    const lng = queryParams.get('lng');
    const locationName = queryParams.get('locationName');

    const userLat = parseFloat(lat || '0');
    const userLng = parseFloat(lng || '0');

    const [theaters, setTheaters] = useState<ITheaterWithDistance[]>([]);
    const [dateFilter, setDateFilter] = useState<string>(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { setSelection } = useBookingStore();

    useEffect(() => {
        const fetchTheaters = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/theaters');
                if (!response.ok) {
                    setError(await response.text());
                    return;
                }
                const data: ITheater[] = await response.json();
                const theatersWithDistance = data.map((theater) => ({
                    ...theater,
                    distance: calculateDistance(userLat, userLng, theater.latitude, theater.longitude),
                }));
                theatersWithDistance.sort((a, b) => a.distance - b.distance);
                setTheaters(theatersWithDistance);
            } catch (error) {
                setError('Failed to fetch theaters');
            } finally {
                setLoading(false);
            }
        };
        fetchTheaters();
    }, [userLat, userLng]);

    const theatersToDisplay = useMemo(() => {
        return theaters.map((theater) => ({
            ...theater,
            movies: theater.movies
                .map((movie) => ({
                    ...movie,
                    showtimes: movie.showtimes.filter((showtime) => showtime.date === dateFilter && showtime.is_active),
                }))
                .filter((movie) => movie.showtimes.length > 0),
        })).filter((theater) => theater.movies.length > 0);
    }, [theaters, dateFilter]);

    const handleDateChange = (date: Date) => {
        const formattedDate = date.toISOString().split('T')[0];
        console.log('Selected date (ISO):', formattedDate);
        setDateFilter(formattedDate);
    };

    const handleShowtimeClick = (theater: ITheater, showtime: IShowtimes) => {
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
            <main className="flex-grow container mx-auto px-4 py-8 text-white">
                <div className="text-center py-10">Loading theaters...</div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex-grow container mx-auto px-4 py-8 text-white">
                <div className="text-center py-10 text-red-500">{error}</div>
            </main>
        );
    }

    return (
        <main className="flex-grow container mx-auto px-4 py-8 text-white">
            <a
                href="/"
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full mb-4 inline-block transition-colors duration-300"
            >
                &larr; Back
            </a>
            <section className="mx-auto max-w-6xl">
                <CalendarStrip days={14} onChange={handleDateChange} className="mt-2" />
            </section>
            <h1 className="text-3xl font-bold mb-6 text-center">
                Theaters Near {decodeURIComponent(locationName || '')}
            </h1>
            <div className="space-y-6">
                {theatersToDisplay.length === 0 ? (
                    <p className="text-center text-gray-400">No showtimes available for {dateFilter}</p>
                ) : (
                    theatersToDisplay.map((theater) => (
                        <div key={theater.id} className="bg-gray-800 rounded-xl p-6 shadow-lg">
                            <h2 className="text-2xl font-semibold">{theater.name}</h2>
                            <p className="text-gray-400 text-sm">{theater.address}</p>
                            <p className="text-gray-400 text-sm mt-2">
                                Distance: <span className="text-white font-medium">{theater.distance?.toFixed(2)} km</span>
                            </p>
                            <div className="mt-4 border-t border-gray-700 pt-4">
                                <h3 className="text-xl font-semibold mb-3">Now Playing</h3>
                                {theater.movies.map((movie) => (
                                    <div key={movie.title} className="mb-4">
                                        <h4 className="text-lg font-medium text-blue-400">{movie.title}</h4>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {movie.showtimes.map((showtime) => (
                                                <button
                                                    key={showtime.id}
                                                    onClick={() => handleShowtimeClick(theater, showtime)}
                                                    className="bg-[#ff6f61] text-white font-medium py-2 px-2 shadow-md hover:bg-red-500 transition duration-300 transform hover:scale-105"
                                                >
                                                    {showtime.time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <FooterStrip />
        </main>
    );
};

export default TheatersByLocationPage;
