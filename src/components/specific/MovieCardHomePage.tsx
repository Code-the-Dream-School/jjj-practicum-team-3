import { IMovie } from '@/types/IMovie';

const MovieCardHomePage = ({ movie }: { movie: IMovie }) => {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
            <div className="relative w-full h-80">
                <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-full object-cover rounded-t-lg"
                />
            </div>
            <div className="p-4 text-center">
                <h3 className="text-sm font-semibold truncate text-white">{movie.Title}</h3>
                <p className="text-xs text-gray-400">{movie.Year}</p>
            </div>
        </div>
    );
};
export default MovieCardHomePage;
