import MovieCardHomePage from "@/components/specific/MovieCardHomePage";

const HomePage = () => {
    const movies = [
        { title: "Movie 1", poster: "https://placehold.co/200x300/6A5ACD/ffffff?text=Movie+1" },
        { title: "Movie 2", poster: "https://placehold.co/200x300/4682B4/ffffff?text=Movie+2" },
        { title: "Movie 3", poster: "https://placehold.co/200x300/20B2AA/ffffff?text=Movie+3" },
        { title: "Movie 4", poster: "https://placehold.co/200x300/CD5C5C/ffffff?text=Movie+4" },
        { title: "Movie 5", poster: "https://placehold.co/200x300/8A2BE2/ffffff?text=Movie+5" },
        { title: "Movie 6", poster: "https://placehold.co/200x300/D2691E/ffffff?text=Movie+6" },
    ];

    const comingSoonMovies = [
        { title: "Coming Soon 1", poster: "https://placehold.co/200x300/36454F/ffffff?text=Coming+Soon+1" },
        { title: "Coming Soon 2", poster: "https://placehold.co/200x300/524380/ffffff?text=Coming+Soon+2" },
        { title: "Coming Soon 3", poster: "https://placehold.co/200x300/5E8C96/ffffff?text=Coming+Soon+3" },
        { title: "Coming Soon 4", poster: "https://placehold.co/200x300/556B2F/ffffff?text=Coming+Soon+4" },
        { title: "Coming Soon 5", poster: "https://placehold.co/200x300/191970/ffffff?text=Coming+Soon+5" },
        { title: "Coming Soon 6", poster: "https://placehold.co/200x300/800000/ffffff?text=Coming+Soon+6" },
    ];

    return (
        <div className="bg-gray-800 text-white min-h-screen pt-24 pb-12">
            <main className="container mx-auto px-4">
                {/* Search & Filter Section */}
                <section className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Zip or City Search"
                            className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Movie"
                            className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Theater"
                            className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </section>

                {/* Movies Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Movies</h2>
                    <div className="flex flex-wrap justify-center md:justify-start">
                        {movies.map((movie, index) => (
                            <MovieCardHomePage key={index} posterSrc={movie.poster} title={movie.title} />
                        ))}
                    </div>
                </section>

                {/* Coming Soon Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
                    <div className="flex flex-wrap justify-center md:justify-start">
                        {comingSoonMovies.map((movie, index) => (
                            <MovieCardHomePage key={index} posterSrc={movie.poster} title={movie.title} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage
