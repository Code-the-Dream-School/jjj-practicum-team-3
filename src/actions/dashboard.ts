"use server";

import supabase from "@/config/supabase-config";

export const getUserDashboardData = async (userId: string) => {
  try {
    // 1. Total Bookings
    const { count: totalBookings, error: bookingsError } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("status", "booked");
    if (bookingsError) throw new Error(bookingsError.message);

    // 2. Total Movies Watched
    const { data: moviesWatched, error: moviesError } = await supabase
      .from("bookings")
      .select("movie_id")
      .eq("user_id", userId)
      .eq("status", "booked");
    if (moviesError) throw new Error(moviesError.message);

    const totalMoviesWatched = new Set(
      (moviesWatched || []).map((b) => b.movie_id)
    ).size;

    // 3 & 4. Total Tickets + Revenue
    const { data: bookingDetails, error: ticketsError } = await supabase
      .from("bookings")
      .select("seat_id, showtime_id")
      .eq("user_id", userId)
      .eq("status", "booked");
    if (ticketsError) throw new Error(ticketsError.message);

    let totalTicketsBooked = 0;
    let totalAmountSpent = 0;

    if (bookingDetails && bookingDetails.length > 0) {
      // get all showtime_ids
      const showtimeIds = bookingDetails.map((b) => b.showtime_id);

      // fetch prices
      const { data: showtimes, error: showtimeError } = await supabase
        .from("showtimes")
        .select("id, ticket_price")
        .in("id", showtimeIds);
      if (showtimeError) throw new Error(showtimeError.message);

      // map showtime prices
      const priceMap: Record<string, number> = {};
      showtimes?.forEach((s) => {
        priceMap[s.id] = s.ticket_price;
      });

      // sum tickets + revenue
      bookingDetails.forEach((b) => {
        const seatCount = Array.isArray(b.seat_id) ? b.seat_id.length : 0;
        totalTicketsBooked += seatCount;
        if (priceMap[b.showtime_id]) {
          totalAmountSpent += seatCount * priceMap[b.showtime_id];
        }
      });
    }

    return {
      success: true,
      data: {
        totalBookings: totalBookings ?? 0,
        totalMoviesWatched,
        totalTicketsBooked,
        totalAmountSpent,
      },
    };
  } catch (error: any) {
    return { success: false, message: error.message, data: null };
  }
};