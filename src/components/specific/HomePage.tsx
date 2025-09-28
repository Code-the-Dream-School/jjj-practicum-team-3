'use client';
import {useEffect, useMemo, useRef, useState} from "react";
import {theaterData} from "@/data/theaterData";
import MovieSlider from "@/components/specific/MovieSlider";
import FooterStrip from "@/components/shared/layout/FooterStrip";
import {IMovie} from "@/interfaces";
import {getAllMovies} from "@/actions/movies";


const HomePage = ({ isMapsLoaded }: { isMapsLoaded: boolean }) => {
    const [movieFilter, setMovieFilter] = useState('');
    const [theaterFilter, setTheaterFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [showTheaterDropdown, setShowTheaterDropdown] = useState(false);
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const locationInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const result = await getAllMovies();
                if (result.success && result.data) {
                    setMovies(result.data);
                } else {
                    console.error("Failed to fetch movies:", result.message);
                }
            } catch (error) {
                console.error("An unexpected error occurred:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    useEffect(() => {
        if (!locationInputRef.current || !isMapsLoaded) {
            return;
        }
        const initAutocomplete = () => {
            if (!window.google || !window.google.maps || !window.google.maps.places) {
                console.error("Google Maps Places library not loaded.");
                return;
            }
            const autocomplete = new window.google.maps.places.Autocomplete(locationInputRef.current, {
               types: ['(cities)'],
            });
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (place.geometry && place.geometry.location) {
                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();
                    const name = place.name;
                    window.location.href = `/?page=theaters-by-location&lat=${lat}&lng=${lng}&locationName=${encodeURIComponent(name)}`;
                }
            });
        };
        initAutocomplete();
    }, [isMapsLoaded]);

    useEffect(() => {
        if (theaterFilter.trim()) {
            setShowTheaterDropdown(true);
        } else {
            setShowTheaterDropdown(false);
        }
    }, [theaterFilter]);
    const filteredMovies = useMemo(() => {
        return movies.filter(movie =>
            movie.title.toLowerCase().includes(movieFilter.toLowerCase())
        );
    }, [movieFilter]);

    const theatersToDisplay = useMemo(() => {
        if (!theaterFilter.trim()) {
            return [];
        }
        return theaterData.filter(theater =>
            theater.name.toLowerCase().includes(theaterFilter.toLowerCase().trim())
        );
    }, [theaterFilter]);

    const comingSoonMovies = useMemo(() => {
        return movies.filter(movie => movie.comingsoon && movie.title.toLowerCase().includes(movieFilter.toLowerCase()));
    }, [movies, movieFilter]);
    const regularMovies = useMemo(() => {
        return movies.filter(movie => !movie.comingsoon && movie.title.toLowerCase().includes(movieFilter.toLowerCase()));
    }, [movies, movieFilter]);

    return (
        <main className="flex-grow container mx-auto px-4 py-0">
            <div className="w-full mb-2">
                <img src="/strip.png" alt="Movie strip" className="w-full h-auto object-cover rounded-xl shadow-lg"/>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <input
                    ref={locationInputRef}
                    type="text"
                    placeholder={isMapsLoaded ? "Enter Location" : "Loading Maps..."}
                    className="w-full md:w-1/3 bg-gray-700 text-gray-200 p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    disabled={!isMapsLoaded}
                />
               <input
                    type="text"
                    placeholder="Movie"
                    className="w-full md:w-1/3 bg-gray-700 text-gray-200 p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={movieFilter}
                    onChange={(e) => setMovieFilter(e.target.value)}
                />
                <div className="relative w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Theater"
                        className="w-full bg-gray-700 text-gray-200 p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={theaterFilter}
                        onChange={(e) => setTheaterFilter(e.target.value)}
                    />
                    {showTheaterDropdown && theatersToDisplay.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                            {theatersToDisplay.map(theater => (
                                <a key={theater.id} href={`/?page=theater-results&theaterId=${theater.id}`} className="block p-3 text-gray-200 hover:bg-gray-700 cursor-pointer">
                                    {theater.name}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {loading ? (
                <div className="text-center py-10 text-white">Loading movies...</div>
            ) : (
                <>
                    <MovieSlider title="Movies" movies={regularMovies}/>
                    <MovieSlider title="Coming Soon" movies={comingSoonMovies}/>
                </>
            )}
            <FooterStrip />
        </main>
    );
};

export default HomePage;
