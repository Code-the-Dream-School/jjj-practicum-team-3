export async function GET() {
  return new Response(JSON.stringify({ message: "Showtimes Route" }), {
    headers: { "Content-Type": "application/json" },
  });
}