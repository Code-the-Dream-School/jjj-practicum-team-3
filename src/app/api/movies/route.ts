import { NextResponse } from "next/server";
import supabase from "@/config/supabase-config";
import { addMovie, getAllMovies } from "@/actions/movies"; // <-- where your functions live

// POST /api/movies  (add movie)
export async function POST(req: Request) {
  const body = await req.json();
  const result = await addMovie(body);
  return NextResponse.json(result);
}

// GET /api/movies OR /api/movies?genre=Action
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const genre = searchParams.get("genre");

  if (genre) {
    // filter movies by genre
    const { data, error } = await supabase
      .from("movies")
      .select("*")
      .eq("genre", genre);

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data });
  }

  // fallback → return all movies
  const result = await getAllMovies();
  return NextResponse.json(result);
}