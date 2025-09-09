import {useMemo} from "react";
import {theaterData} from "@/data/theaterData";
import {ITheaterWithDistance} from "@/types/ITheaterWithDistance";

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
};

const TheatersByLocationPage = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const lat = queryParams.get('lat');
    const lng = queryParams.get('lng');
    const locationName = queryParams.get('locationName');

    const userLat = parseFloat(lat || '0');
    const userLng = parseFloat(lng || '0');

    const theatersToDisplay = useMemo(() => {
        let list: ITheaterWithDistance[] = theaterData.map(theater => ({
            ...theater,
            distance: calculateDistance(
                userLat,
                userLng,
                theater.latitude,
                theater.longitude
            )
        }));
        list.sort((a, b) => a.distance - b.distance);
        return list;
    }, [userLat, userLng]);

    return (
        <main className="flex-grow container mx-auto px-4 py-8 text-white">
            <a href="/" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full mb-4 inline-block transition-colors duration-300">
                &larr; Back
            </a>
            <h1 className="text-3xl font-bold mb-6 text-center">Theaters Near {decodeURIComponent(locationName || '')}</h1>
            <div className="space-y-6">
                {theatersToDisplay.map(theater => (
                    <div key={theater.id} className="bg-gray-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-semibold">{theater.name}</h2>
                        <p className="text-gray-400 text-sm">{theater.address}</p>
                        <p className="text-gray-400 text-sm mt-2">Distance: <span className="text-white font-medium">{theater.distance.toFixed(2)} km</span></p>
                        <div className="mt-4 border-t border-gray-700 pt-4">
                            <h3 className="text-xl font-semibold mb-3">Now Playing</h3>
                            {theater.movies.map(movie => (
                                <div key={movie.title} className="mb-4">
                                    <h4 className="text-lg font-medium text-blue-400">{movie.title}</h4>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {movie.showtimes.flatMap(showtime => showtime.times).map((time, index) => (
                                            <a key={index} href={`#`} className="bg-[#ff6f61] text-white font-medium py-2 px-2 shadow-md hover:bg-red-500 transition duration-300 transform hover:scale-105">
                                                {time}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};
export default TheatersByLocationPage;
