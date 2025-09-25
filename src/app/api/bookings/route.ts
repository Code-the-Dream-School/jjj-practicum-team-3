import { supabase } from "@/lib/supabaseClient";
import { bookSeats } from "@/actions/seats";
import { v4 as uuidv4 } from "uuid";

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
        const { seat_id, showtimeId, movie_id, total, user_id, user_email, booking_date, payment_status } = body;

        // Validate required fields
        if (!seat_id || !showtimeId || !movie_id || !total || !booking_date || !payment_status) {
            return new Response(
                JSON.stringify({
                    error: "Missing one or more required fields: seat_id, showtimeId, movie_id, total, booking_date, payment_status",
                }),
                { headers: { "Content-Type": "application/json" }, status: 400 }
            );
        }

        // Validate showtimeId is a valid bigint
        const showtimeIdNum = parseInt(showtimeId, 10);
        if (isNaN(showtimeIdNum)) {
            return new Response(
                JSON.stringify({ error: `Invalid bigint format for showtimeId: ${showtimeId}` }),
                { headers: { "Content-Type": "application/json" }, status: 400 }
            );
        }

        // Fetch seats based on the showtimeId (bigint) with status
        const { data: seatData, error: seatError } = await supabase
            .from("seats")
            .select("id, seat_status")
            .eq("showtime_id", showtimeIdNum);

        if (seatError || !seatData) {
            return new Response(JSON.stringify({ error: seatError?.message || "Seat data not found" }), {
                headers: { "Content-Type": "application/json" },
                status: 500,
            });
        }

        console.log("Fetched seatData IDs:", seatData.map(s => s.id));
        console.log("Payload seat_id:", seat_id);
        console.log("SeatData length:", seatData.length);

        // Filter seatIds to only those provided in the payload and not already booked
        const seatIds = seatData
            .filter((seat) => seat_id.includes(seat.id.toString()) && seat.seat_status !== 'booked')
            .map((seat) => seat.id.toString());

        console.log("Filtered seatIds:", seatIds);

        // Log unmatched IDs for debugging
        const unmatchedIds = seat_id.filter(id => !seatData.some(seat => seat.id.toString() === id));
        if (unmatchedIds.length > 0) {
            console.log("Unmatched IDs in payload:", unmatchedIds);
        }

        if (seatIds.length === 0) {
            return new Response(JSON.stringify({ error: "No matching available seats found" }), {
                headers: { "Content-Type": "application/json" },
                status: 400,
            });
        }

        // Insert into bookings table first
        const confirmationCode = uuidv4();
        const effectiveUserId = user_id === "anonymous" ? null : user_id;
        const { data, error } = await supabase
            .from("bookings")
            .insert([
                {
                    user_id: effectiveUserId,
                    user_email: user_email || null,
                    seat_id: seat_id,
                    booking_date: booking_date,
                    payment_status: payment_status,
                    showtime_id: showtimeIdNum,
                    confirmation_code: confirmationCode,
                    status: "booked",
                    movie_id: movie_id,
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

        // Book the seats after successful insertion
        const bookingResult = await bookSeats(showtimeIdNum.toString(), seatIds);
        if (!bookingResult.success) {
            // Roll back the booking insert if seat booking fails
            await supabase.from("bookings").delete().eq("confirmation_code", confirmationCode);
            return new Response(JSON.stringify({ error: bookingResult.message }), {
                headers: { "Content-Type": "application/json" },
                status: 500,
            });
        }

        return new Response(
            JSON.stringify({ message: "Booking created", booking: data, confirmationCode }),
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
