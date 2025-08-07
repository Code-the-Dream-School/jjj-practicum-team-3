export async function GET() {
  return new Response(JSON.stringify({ message: "Movies Route" }), {
    headers: { "Content-Type": "application/json" },
  });
}