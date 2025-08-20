export async function GET() {
  return new Response(JSON.stringify({ message: "Get All Showtimes" }), {
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
