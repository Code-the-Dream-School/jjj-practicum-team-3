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
  try {
    const body = await request.json();
    const theater = body as ITheater;

    const { data, error } = await supabase
      .from("theaters")
      .insert([
        {
          name: theater.name,
          address: theater.address,
          capacity: theater.capacity,
          is_active: theater.is_active,
        },
      ])
      .select()
      .single();
    return new Response(JSON.stringify(theater), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
}
