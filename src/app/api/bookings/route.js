export async function GET() {
  return new Response(JSON.stringify({ message: "Bookings Route" }), {
    headers: { "Content-Type": "application/json" },
  });
}