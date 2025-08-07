export async function GET() {
  return new Response(JSON.stringify({ message: "Seats Route" }), {
    headers: { "Content-Type": "application/json" },
  });
}