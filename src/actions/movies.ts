'use server'
import supabase from "@/config/supabase-config";
import { IMovie } from "@/interfaces";

//add movie
export const addMovie = async (movie: Partial<IMovie> ) => {
    const { data, error } = await supabase.from("movies").insert([movie]);
    
    if (error) {
        return {
            success: false, 
            message: error.message,
        };
    }
    
        return {
            success: true, 
            message: "Movie added successfully",
        };
    };

//update movie
export const updateMovie = async (id: string, movie: Partial<IMovie> ) => {
        const { data, error } = await supabase
            .from("movies")
            .update(movie)
            .eq("id", id);
        
        if (error) {
            return {
                success: false, 
                message: error.message,
            };
        }
        
        return {
                success: true, 
                message: "Movie updated successfully",
            };
        };

//delete movie
export const deleteMovie = async (id: string) => {
    const { data, error } = await supabase
                .from("movies")
                .delete()
                .eq("id", id);
    
    if (error) {
        return {
            success: false, 
            message: error.message,
        };
    }
    
    return {
            success: true, 
            message: "Movie deleted successfully",
        };
    };

//get movie by id
export const getMovieById = async (id: string) => {
        const { data, error } = await supabase
                    .from("movies")
                    .select("*")
                    .eq("id", id)
        
        if (error) {
            return {
                success: false, 
                message: error.message,
            };
        }
        
        if(data.length === 0) {
            return {
                success: false, 
                message: "Movie not found",
                };
            }
        
        const movie = data[0];
        
        
        return {
                success: true, 
                data: movie as IMovie,
            };
        };
        
//get all movies
export const getAllMovies = async () => {
    const { data, error } = await supabase
                .from("movies")
                .select("*")
    
    if (error) {
        return {
            success: false, 
            message: error.message,
        };
    }
    
    return {
            success: true, 
            data: data as IMovie[],
        };
    };