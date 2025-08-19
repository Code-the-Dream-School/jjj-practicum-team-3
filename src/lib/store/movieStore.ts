import { create } from 'zustand';

interface Movie {
    Title: string;
    Year: string;
    Poster: string;
    // Add other fields as needed
}

interface MovieStore {
    movies: Movie[];
    currentMovies: Movie[];
    comingSoonMovies: Movie[];
    setMovies: (movies: Movie[]) => void;
}

const useMovieStore = create<MovieStore>((set) => ({
    movies: [],
    currentMovies: [],
    comingSoonMovies: [],
    setMovies: (movies) => set({
        movies,
        currentMovies: movies.filter((m) => parseInt(m.Year) < 2025),
        comingSoonMovies: movies.filter((m) => parseInt(m.Year) >= 2025),
    }),
}));

export default useMovieStore;
