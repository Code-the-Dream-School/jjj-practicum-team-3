export async function GET() {
  return new Response(JSON.stringify({ message: "Get Users Route" }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  return new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  return new Response(JSON.stringify({message: "Delete User Route"}), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}