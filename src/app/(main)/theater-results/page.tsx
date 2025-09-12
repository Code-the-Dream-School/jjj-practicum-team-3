'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

// Define the data structure with TypeScript interfaces for type safety.
interface Showtime {
    date: string;
    times: string[];
}

interface Movie {
    title: string;
    Poster: string;
    showtimes: Showtime[];
}

interface Theater {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    address: string;

    movies: Movie[];
}

// Hardcoded data from the provided text file. In a real application, this would be fetched from an API.
const theaterData: Theater[] = [

    {
        "id": "1",
        "name": "Grandview Theater",
        "latitude": 34.0522,
        "longitude": -118.2437,
        "address": "123 Main Street, Anytown, CA 12345",

        "movies": [
            {
                "title": "Nobody 2",
                "Poster": "/posters/1.png",
                "showtimes": [
                    {
                        "date": "2025-08-20",
                        "times": ["10:00 AM", "1:30 PM", "4:45 PM"]
                    },
                    {
                        "date": "2025-08-21",
                        "times": ["11:00 AM", "2:00 PM", "5:30 PM", "8:00 PM"]
                    }
                ]
            },
            {
                "title": "Weapons",
                "Poster": "/posters/2.png",
                "showtimes": [
                    {
                        "date": "2025-08-20",
                        "times": ["11:30 AM", "2:45 PM"]
                    },
                    {
                        "date": "2025-08-21",
                        "times": ["12:00 PM", "3:15 PM", "6:30 PM"]
                    }
                ]
            }
        ]
    },
    {
        "id": "2",
        "name": "Downtown Cinema",
        "latitude": 40.7128,
        "longitude": -74.0060,
        "address": "456 Oak Avenue, Metropolis, NY 10001",

        "movies": [
            {
                "title": "Nobody 2",
                "Poster": "/posters/1.png",
                "showtimes": [
                    {
                        "date": "2025-08-20",
                        "times": ["10:00 AM", "1:30 PM", "4:45 PM"]
                    },
                    {
                        "date": "2025-08-21",
                        "times": ["11:00 AM", "2:00 PM", "5:30 PM", "8:00 PM"]
                    }
                ]
            },
            {
                "title": "Weapons",
                "Poster": "/posters/2.png",
                "showtimes": [
                    {
                        "date": "2025-08-20",
                        "times": ["11:30 AM", "2:45 PM"]
                    },
                    {
                        "date": "2025-08-21",
                        "times": ["12:00 PM", "3:15 PM", "6:30 PM"]
                    }
                ]
            }
        ]
    },
    {
        "id": "3",
        "name": "Northside Drive-In",
        "latitude": 41.8781,
        "longitude": -87.6298,
        "address": "789 Pine Boulevard, Bigtown, IL 60601",
        "movies": [
            {
                "title": "Nobody 2",
                "Poster": "/posters/1.png",
                "showtimes": [
                    {
                        "date": "2025-08-20",
                        "times": ["10:00 AM", "1:30 PM", "4:45 PM"]
                    },
                    {
                        "date": "2025-08-21",
                        "times": ["11:00 AM", "2:00 PM", "5:30 PM", "8:00 PM"]
                    }
                ]
            },
            {
                "title": "Weapons",
                "Poster": "/posters/2.png",
                "showtimes": [
                    {
                        "date": "2025-08-20",
                        "times": ["11:30 AM", "2:45 PM"]
                    },
                    {
                        "date": "2025-08-21",
                        "times": ["12:00 PM", "3:15 PM", "6:30 PM"]
                    }
                ]
            }
        ]
    }
];

// Main React component for the theater results page
export default function TheaterResults() {
    // Use React's useState hook to manage the selected date
    const searchParams = useSearchParams();
    const theaterId = searchParams.get('theaterId');
    const [selectedDate, setSelectedDate] = useState<string>('2025-08-20');
    const [movieFilter, setMovieFilter] = useState<string>('');
    // A placeholder for the selected theater ID. This would be passed via a route parameter or context in a real app.
  //  const selectedTheaterId = "1";

    // Find the theater based on the ID
  //  const theater = theaterData.find(t => t.id === selectedTheaterId);
    const theater = theaterData.find(t => t.id === theaterId);
    // If the theater is not found, display a message.
    if (!theater) {
        return (
            <div className="text-center text-gray-500 text-lg mt-8">
                Theater not found.
            </div>
        );
    }

    // Get all unique dates across all movies for the date selector.
    const allDates = Array.from(new Set(
        theater.movies.flatMap(movie => movie.showtimes.map(st => st.date))
    )).sort();

    return (
        <div className="bg-[#151925] min-h-screen text-white">
            <div className="w-full mb-2">
                <img src="/strip.png" alt="Movie strip" className="w-full h-auto object-cover rounded-xl shadow-lg"/>
            </div>
            {/* Input section placeholder */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <input type="text" placeholder="Enter Location" className="w-full md:w-1/3 bg-gray-700 text-gray-200 p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <input
                    type="text"
                    placeholder="Movie"
                    className="w-full md:w-1/3 bg-gray-700 text-gray-200 p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={movieFilter}
                    onChange={(e) => setMovieFilter(e.target.value)}
                />
                <input type="text" placeholder="Theater" className="w-full md:w-1/3 bg-gray-700 text-gray-200 p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-blue-500"/>
            </div>
            <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Date Selector Component */}
                <div className="bg-[#1e293b] rounded-2xl shadow-lg p-4 mb-6">
                    <h2 className="text-xl font-semibold mb-3 text-center text-gray-200">Select Date</h2>
                    <div className="flex flex-wrap justify-center gap-2">
                        {allDates.map(date => (
                            <button
                                key={date}
                                onClick={() => setSelectedDate(date)}
                                className={`
                                  font-medium py-2 px-4 rounded-full transition duration-300
                                  ${selectedDate === date ? 'bg-[#ff6f61] text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
                                `}
                            >
                                {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Movie Cards Container */}
                <div className="space-y-6 bg-[#D9D9D9] rounded-2xl shadow-lg p-6" >
                    <h2 className="text-2xl text-black font-bold" >{theater.name}</h2>
                    <h3 className="text-xl text-gray-500 ">{theater.address}</h3>
                    {theater.movies.map(movie => {
                        // Find the showtimes for the selected date
                        const filteredShowtimes = movie.showtimes.find(st => st.date === selectedDate);

                        // Only render the movie card if there are showtimes for the selected date
                        if (!filteredShowtimes) {
                            return null;
                        }

                        return (

                            <div
                                key={movie.title}
                                className="bg-[#FFFAFA] rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6"
                            >
                                <img
                                    src={movie.Poster}
                                    alt="Movie Poster"
                                    className="w-24 h-36 rounded-xl shadow-md flex-shrink-0"
                                />
                                <div className="flex-grow flex flex-col items-center md:items-start text-center md:text-left">
                                    <h3 className="text-2xl font-bold text-black">{movie.title}</h3>
                                    <p className="text-gray-400">1 hr 16 min</p>
                                    <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                                        {filteredShowtimes.times.map(time => (
                                            <button
                                                key={time}
                                                className="bg-[#ff6f61] text-white font-medium py-2 px-2 shadow-md hover:bg-red-500 transition duration-300 transform hover:scale-105"
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
