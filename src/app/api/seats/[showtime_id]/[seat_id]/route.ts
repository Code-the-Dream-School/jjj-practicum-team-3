import { supabase } from "@/lib/supabaseClient";
import { ISeat } from "@/types/ISeat";

export async function GET(
  req: Request,
  { params }: { params: { showtime_id?: string; seat_id?: string } }
) {
  const { showtime_id, seat_id } = await params;
  if (!showtime_id || !seat_id) {
    return new Response(
      JSON.stringify({ error: "Missing showtime_id or seat_id" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }

  const { data: seat, error } = await supabase
    .from("seats")
    .select("*")
    .eq("showtime_id", showtime_id)
    .eq("id", seat_id)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }

  return new Response(JSON.stringify(seat), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}


export async function PATCH(
    req: Request,
    { params }: { params: {showtime_id?: string; seat_id?: string}}
){
      const { showtime_id, seat_id } = await params;
  if (!showtime_id || !seat_id) {
    return new Response(
      JSON.stringify({ error: "Missing showtime_id or seat_id" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }

  const body = await req.json();
  const seat = body as ISeat;
  //Remove null fields to avoid accidental null updates
  for (const key of Object.keys(seat)) {
    const value = (seat as any)[key];
    if (value == null) delete (seat as any)[key];
  }

const { data, error } = await supabase
  .from('seats')
  .update(seat)
  .eq('id', Number(seat_id))
  .select()

   if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
