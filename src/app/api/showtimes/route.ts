export async function GET() {
  return new Response(JSON.stringify({ message: "Get All Showtimes" }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return new Response(JSON.stringify("Showtime created: " + body), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  return new Response(JSON.stringify("Showtime modified: " + body), {
    headers: { "Content-Type": "application/json" },
    status: 204,
  });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  return new Response(JSON.stringify({message: "Showtime Deleted"}), {
    headers: { "Content-Type": "application/json" },
    status: 204,
  });
}