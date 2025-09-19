import { IMovie } from '@/types/IMovie';
import Link from 'next/link';

const MovieCardHomePage = ({ movie }: { movie: IMovie }) => {
    return (
        <Link href={`/movie/${movie.id}`} passHref>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
                <div className="relative w-full h-80">

                    <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover rounded-t-lg"
                    />
                </div>
                <div className="p-4 text-center">
                    <h3 className="text-sm font-semibold truncate text-white">{movie.title}</h3>
                    <p className="text-xs text-gray-400">{movie.year}</p>
                </div>
            </div>
        </Link>
    );
};
export default MovieCardHomePage;
