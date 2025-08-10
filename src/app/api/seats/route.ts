export async function GET() {
  return new Response(JSON.stringify({ message: "Get All Seats" }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return new Response(JSON.stringify("Seat created: " + body), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  return new Response(JSON.stringify("Seat modified: " + body), {
    headers: { "Content-Type": "application/json" },
    status: 204,
  });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  return new Response(JSON.stringify({message: "Seat Delete"}), {
    headers: { "Content-Type": "application/json" },
    status: 204,
  });
}