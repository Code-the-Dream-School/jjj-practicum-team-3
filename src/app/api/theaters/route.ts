import { supabase } from "@/lib/supabaseClient";
import { ITheater } from "@/types/ITheater";

export async function GET() {
  const { data, error } = await supabase.from("theaters").select("*");

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
  const body = await request.json();
  return new Response(JSON.stringify("Showtime created: " + body), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}
