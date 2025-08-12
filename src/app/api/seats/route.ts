export async function GET() {
  return new Response(JSON.stringify({ message: "Get All Seats" }), {
    headers: { "Content-Type": "application/json" },
    status: 200
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return new Response(JSON.stringify("Seat created: " + body), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}