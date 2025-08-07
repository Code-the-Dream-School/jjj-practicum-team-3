export async function GET() {
  return new Response(JSON.stringify({ message: "GET Bookings Route" }), {
    headers: { "Content-Type": "application/json" },
  });
}