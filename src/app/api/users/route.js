export async function GET() {
  return new Response(JSON.stringify({ message: "Users Route" }), {
    headers: { "Content-Type": "application/json" },
  });
}