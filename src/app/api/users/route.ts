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
}