import { NextResponse } from "next/server";
import { registerUser } from "@/actions/users";

// Handle POST request
export async function POST(req: Request) {
  const body = await req.json();

  const result = await registerUser(body);

  if (!result.success) {
    return NextResponse.json({ error: result.message }, { status: 400 });
  }

  // Return the user created by registerUser
  return NextResponse.json(result.user, { status: 201 });
}

// Handle GET request
export async function GET() {
  return new Response(JSON.stringify({ message: "Get All Users" }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}