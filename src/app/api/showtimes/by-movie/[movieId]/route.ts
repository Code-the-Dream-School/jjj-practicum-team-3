import { NextResponse } from "next/server";
import { getShowtimesByMovieId } from "@/actions/showtimes";

export async function GET(
    req: Request,
    { params }: { params: { movieId: string } } // MUST match folder [movieId]
  ) {
    const { movieId } = params;  // ✅ matches folder name
    const url = new URL(req.url);
    const dateFilter = url.searchParams.get("date") || undefined;
  
    const result = await getShowtimesByMovieId(movieId, dateFilter);
  
    return NextResponse.json(result);
  }