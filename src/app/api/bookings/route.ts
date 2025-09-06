import {supabase} from "@/lib/supabaseClient"
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
      !booking?.payment_status
    ) {
      return new Response(
        JSON.stringify({
          error:
            "Missing one or more required fields: user_id, seat_id, booking_date, payment_status",
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
