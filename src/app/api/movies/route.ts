export async function GET() {
  return new Response(JSON.stringify({ message: "Get Movies Route" }), {
    headers: { "Content-Type": "application/json" },
  });
}