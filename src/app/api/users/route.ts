import { NextResponse } from "next/server";
import { registerUser } from "@/actions/users";

export async function POST(req: Request) {
  const body = await req.json();

  const result = await registerUser(body);

  if (!result.success) {
    return NextResponse.json({ error: result.message }, { status: 400 });
  }

  // return the user created by registerUser
  return NextResponse.json(result.user, { status: 201 });

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