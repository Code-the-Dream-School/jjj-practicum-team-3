import { NextResponse } from "next/server";
import { loginUser } from "@/actions/users";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await loginUser(body);

  if (!result.success) {
    return NextResponse.json(result, { status: 400 });
  }

  // Create the response manually
  const res = NextResponse.json(
    { success: true, message: result.message, user: result.user },
    { status: 200 }
  );

  // Sets the cookie with JWT
  if (result.token) {
    res.cookies.set({
      name: "jwt_token",
      value: String(result.token),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
  }

  return res;
}