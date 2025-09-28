import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
import { IShowtimes } from "@/interfaces/index";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const { id } = params;

  try {
    const { data, error } = await supabase
        .from("showtimes")
        .select(`
        id, movie_id, theater_id, date, time, ticket_price, available_seats, created_at, is_active,
        movies (id, title, poster, runtime)
      `)
        .eq("id", id)
        .single();

    if (error) {
      console.error("Supabase error for showtime ID:", id, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Showtime not found" }, { status: 404 });
    }

    const showtime: IShowtimes = {
      id: data.id,
      movie_id: Number(data.movie_id),
      theater_id: data.theater_id,
      date: data.date,
      time: data.time,
      ticket_price: data.ticket_price,
      available_seats: data.available_seats,
      created_at: data.created_at,
      is_active: data.is_active,
      movie: {
        id: Number(data.movies.id),
        title: data.movies.title || "Unknown title",
        poster: data.movies.poster || "/placeholder.png",
        runtime: data.movies.runtime || "Unknown runtime",
      },
    };

    return NextResponse.json(showtime, { status: 200 });
  } catch (err) {
    console.error("Unexpected error for showtime ID:", id, err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
