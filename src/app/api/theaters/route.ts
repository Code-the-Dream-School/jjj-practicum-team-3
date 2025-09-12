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

    if (
      !theater?.name ||
      !theater?.address ||
      theater.capacity === undefined ||
      theater.is_active === undefined
    ) {
      return new Response(
        JSON.stringify({
          error:
            "Missing one or more required fields: name, address, capacity, is_active",
        }),
        { headers: { "Content-Type": "application/json" }, status: 400 }
      );
    }
    if (theater.name.length < 2 || theater.name.length > 100) {
      return new Response(
        JSON.stringify({ error: "Theater name must be 2–100 characters" }),
        { headers: { "Content-Type": "application/json" }, status: 400 }
      );
    }

    if (!Number.isInteger(theater.capacity) || theater.capacity <= 0) {
      return new Response(
        JSON.stringify({ error: "Capacity must be a positive integer" }),
        { headers: { "Content-Type": "application/json" }, status: 400 }
      );
    }
    
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
