import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
import { ITheater, ITheaterMovie, IShowtimes } from "@/interfaces/index";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const { id } = params;

  try {
    const { data, error } = await supabase
        .from("theaters")
        .select(`
        id, name, address, latitude, longitude,
        showtimes (
          id, movie_id, theater_id, date, time, ticket_price, available_seats, created_at, is_active,
          movies (
            id, title, poster, runtime
          )
        )
      `)
        .eq("id", id)
        .single();

    if (error) {
      console.error("Supabase error for theater ID:", id, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Theater not found" }, { status: 404 });
    }

    const movieMap: { [key: string]: ITheaterMovie } = {};
    data.showtimes.forEach((showtime: any) => {
      const movieTitle = showtime.movies.title || "Unknown title";
      if (!movieMap[movieTitle]) {
        movieMap[movieTitle] = {
          title: movieTitle,
          showtimes: [],
        };
      }
      movieMap[movieTitle].showtimes.push({
        id: showtime.id,
        movie_id: Number(showtime.movie_id), // Convert bigint to number
        theater_id: showtime.theater_id,
        date: showtime.date,
        time: showtime.time,
        ticket_price: showtime.ticket_price,
        available_seats: showtime.available_seats,
        created_at: showtime.created_at,
        is_active: showtime.is_active,
        movie: {
          id: Number(showtime.movies.id),
          title: showtime.movies.title || "Unknown title",
          poster: showtime.movies.poster || "/placeholder.png",
          runtime: showtime.movies.runtime || "Unknown runtime",
        },
      });
    });

    const transformedData: ITheater = {
      id: data.id,
      name: data.name,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      movies: Object.values(movieMap),
    };

    return NextResponse.json(transformedData, { status: 200 });
  } catch (err) {
    console.error("Unexpected error for theater ID:", id, err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
