export async function GET() {
  return new Response(JSON.stringify({ message: "GET All Bookings" }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return new Response(JSON.stringify("Booking created: " + body), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  return new Response(JSON.stringify("Booking modified: " + body), {
    headers: { "Content-Type": "application/json" },
    status: 204,
  });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  return new Response(JSON.stringify({message: "Booking Deleted"}), {
    headers: { "Content-Type": "application/json" },
    status: 204,
  });
}