import { supabase } from "@/lib/supabaseClient";
import { ISeat } from "@/types/ISeat";
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
  try {
    const body = await request.json();
    const seat = body as ISeat;
    console.log("ISeat: ", seat);
    const { data, error } = await supabase.from("seats").insert(seat).select();
    if (error) {
      console.log("error: ", error);
    }
    if (!data){
      console.log("uh oh ..")
    }
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
}
