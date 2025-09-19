import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  let { data: seats, error } = await supabase.from("seats").select("*");
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

export async function POST(request: Request) {
  const body = await request.json();
  return new Response(JSON.stringify("Seat created: " + body), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}
