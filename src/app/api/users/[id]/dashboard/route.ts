import { NextResponse } from "next/server";
import supabase from "@/config/supabase-config";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;

    // Get bookings for this user
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", userId) 
      .eq("status", "booked");

    if (error) throw new Error(error.message);

    if (!bookings || bookings.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          totalBookings: 0,
          totalMoviesWatched: 0,
          totalTicketsBooked: 0,
          totalAmountSpent: 0,
        },
      });
    }

    let totalMoviesWatched = 0;
    let totalTicketsBooked = 0;
    let totalAmountSpent = 0;
    const seenMovies: Record<string, boolean> = {};

    bookings.forEach((b) => {
      totalTicketsBooked += b.total_tickets || 0;
      totalAmountSpent += b.total_amount || 0;

      if (!seenMovies[b.movie_id]) {
        seenMovies[b.movie_id] = true;
        totalMoviesWatched++;
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        totalBookings: bookings.length,
        totalMoviesWatched,
        totalTicketsBooked,
        totalAmountSpent,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}