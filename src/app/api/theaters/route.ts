import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
import { ITheater, ITheaterMovie, IShowtimes } from "@/interfaces/index";

export async function GET() {
  const { data, error } = await supabase
      .from("theaters")
      .select(`
      id, name, address, latitude, longitude,
      showtimes (
        id, movie_id, theater_id, date, time, ticket_price, available_seats, created_at, is_active,
        movies (
          title
        )
      )
    `);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Transform data to match ITheater interface
  const transformedData: ITheater[] = data.map((theater) => {
    const movieMap: { [key: string]: ITheaterMovie } = {};
    theater.showtimes.forEach((showtime: any) => {
      const movieTitle = showtime.movies.title;
      if (!movieMap[movieTitle]) {
        movieMap[movieTitle] = {
          title: movieTitle,
          showtimes: [],
        };
      }
      movieMap[movieTitle].showtimes.push({
        id: showtime.id,
        movie_id: showtime.movie_id,
        theater_id: showtime.theater_id,
        date: showtime.date,
        time: showtime.time,
        ticket_price: showtime.ticket_price,
        available_seats: showtime.available_seats,
        created_at: showtime.created_at,
        is_active: showtime.is_active,
        movie: { title: movieTitle } as any,
      });
    });

    return {
      id: theater.id,
      name: theater.name,
      address: theater.address,
      latitude: theater.latitude,
      longitude: theater.longitude,
      movies: Object.values(movieMap),
    };
  });

  return NextResponse.json(transformedData, { status: 200 });
}
