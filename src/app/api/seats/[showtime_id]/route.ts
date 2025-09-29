import { supabase } from "@/lib/supabaseClient";

export async function GET(
  req: Request,
  { params }: { params: { showtime_id?: string } }
) {
  const { showtime_id } = await params;
  console.log("Showtime: ",showtime_id);
  if (!showtime_id) {
    return new Response(JSON.stringify({ error: "Missing id" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let { data: seats, error } = await supabase
    .from("seats")
    .select("*")
    .eq("showtime_id", showtime_id);

  if(!seats || seats.length === 0){
     return new Response(JSON.stringify({ error: "Showtime time id is not associated with any seat." }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
  return new Response(JSON.stringify(seats), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
