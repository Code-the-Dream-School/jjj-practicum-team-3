// export async function GET() {
//   return new Response(JSON.stringify({ message: "Get All Showtimes" }), {
//     headers: { "Content-Type": "application/json" },
//     status: 200,
//   });
// }

// export async function POST(request: Request) {
//   const body = await request.json();
//   return new Response(JSON.stringify("Showtime created: " + body), {
//     headers: { "Content-Type": "application/json" },
//     status: 201,
//   });
// }

// import { createClient } from "@supabase/supabase-js";

// // Make sure these env variables are set in your .env.local
// const supabase = createClient(
//   process.env.SUPABASE_URL!,
//   process.env.SUPABASE_KEY!
// );

// export async function GET() {
//   return new Response(
//     JSON.stringify({ message: "Get All Showtimes" }),
//     {
//       headers: { "Content-Type": "application/json" },
//       status: 200,
//     }
//   );
// }

// export async function POST(request: Request) {
//   const body = await request.json();

//   // Insert into Supabase
//   const { data: showtime, error } = await supabase
//     .from("showtimes")
//     .insert([body])
//     .select()
//     .single();

//   if (error) {
//     return new Response(
//       JSON.stringify({ error: error.message }),
//       { headers: { "Content-Type": "application/json" }, status: 400 }
//     );
//   }

//   // Return the actual created row
//   return new Response(
//     JSON.stringify(showtime),
//     { headers: { "Content-Type": "application/json" }, status: 201 }
//   );
// }

import { NextResponse } from "next/server";
import { AddShowtimes, getAllShowtimes } from "@/actions/showtimes";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await AddShowtimes(body);

  // Return result as JSON so Postman sees the actual object
  return NextResponse.json(result);
}

export async function GET() {
  const result = await getAllShowtimes();
  return NextResponse.json(result);
}