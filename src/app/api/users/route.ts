export async function GET() {
  return new Response(JSON.stringify({ message: "Get All Users" }), {
    headers: { "Content-Type": "application/json" },
    status: 200
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return new Response(JSON.stringify("User created: " + body), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}