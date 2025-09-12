// This script will read your local JSON data and insert it into Supabase.
// IMPORTANT: You must first create the 'movies' table in your Supabase project
// using the SQL provided in the accompanying instructions.
import { supabase } from '../services/supabaseClient.js';
import { movieData } from '../services/movies.js'; 
/**
 * Inserts movie data from a local JSON file into the Supabase 'movies' table.
 */
async function insertMovies() {
  console.log('Starting movie data insertion...');
  
  //Extract the array of movies
  const movies = movieData.movies;

  for (const movie of movies) {
    try {
      const { data, error } = await supabase
        .from('movies') // Supabase table name
        .insert([
          {
            // id: movie.id,
            title: movie.Title,
            year: movie.Year,
            runtime: movie.RunTime,
            genre: movie.Genre,
            director: movie.Director,
            actors: movie.Actors,
            description: movie.Description,
            country: movie.Country,
            poster: movie.Poster,
            comingsoon: movie.ComingSoon,
          },
        ]);
     
      if (error) {
        console.error(`Error inserting movie ${movie.Title}:`, error.message);
      } else {
        console.log(`Successfully inserted movie: ${movie.Title}`);
      }
    } catch (err) {
      console.error(`An unexpected error occurred for movie ${movie.Title}:`, err);
    }
  }
  console.log('Movie data insertion complete.');
}
// Call the function to run the script.
insertMovies();