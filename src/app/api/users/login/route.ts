import { NextResponse } from "next/server";
import { loginUser } from "@/actions/users";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await loginUser(body);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    // Build the response
    const res = NextResponse.json(result, { status: 200 });

    // Set JWT cookie
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
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}