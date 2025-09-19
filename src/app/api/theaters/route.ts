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
      theater.latitude === undefined ||
      theater.longitude === undefined
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

 if (typeof theater.latitude !== "number" || typeof theater.longitude !== "number") {
  return new Response(
    JSON.stringify({ error: "Latitude and longitude must be numbers" }),
    { headers: { "Content-Type": "application/json" }, status: 400 }
  );
}
    
    const { data, error } = await supabase
      .from("theaters")
      .insert([
        {
          name: theater.name,
          address: theater.address,
          latitude: theater.latitude,
          longitude: theater.longitude,
        },
      ])
      .select()
      .single();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
}
