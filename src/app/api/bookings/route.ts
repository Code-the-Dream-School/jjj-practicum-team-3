import { supabase } from "@/lib/supabaseClient";
import { IBooking } from "@/types/IBooking";

export async function GET() {
  const { data, error } = await supabase.from("bookings").select("*");

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const booking = body as IBooking;

    if (
      !booking?.user_id ||
      !booking?.seat_id ||
      !booking?.booking_date ||
      !booking?.payment_status ||
      !booking?.showtime_id ||
      !booking?.confirmation_code ||
      !booking?.status ||
      !booking?.movie_id ||
      booking?.total_tickets == null ||
      booking?.total_amount == null
    ) {
      return new Response(
        JSON.stringify({
          error:
            "Missing one or more required fields: user_id, seat_id, booking_date, payment_status, showtime_id, confirmation_code, status, movie_id, total_tickets, total_amount",
        }),
        { headers: { "Content-Type": "application/json" }, status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          user_id: booking.user_id,
          user_email: booking.user_email,
          seat_id: booking.seat_id,
          booking_date: booking.booking_date,
          payment_status: booking.payment_status,
          showtime_id: booking.showtime_id,
          confirmation_code: booking.confirmation_code,
          status: booking.status,
          movie_id: booking.movie_id,
          total_tickets: booking.total_tickets,
          total_amount: booking.total_amount,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { "Content-Type": "application/json" },
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({ message: "Booking created", booking: data }),
      {
        headers: { "Content-Type": "application/json" },
        status: 201,
      }
    );
  } catch (e) {
    console.error("Unexpected error:", e);
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
}
