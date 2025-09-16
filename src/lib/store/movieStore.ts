import { create } from 'zustand';
import {IMovie} from "@/interfaces";
interface MovieStoreState {
    movies: IMovie[];
    loading: boolean;
    setMovies: (newMovies: IMovie[]) => void;
}
const useMovieStore = create<MovieStoreState>((set) => ({
    movies: [],
    loading: true,
    setMovies: (newMovies) => set({movies: newMovies, loading: false}),
}));

export {useMovieStore};
