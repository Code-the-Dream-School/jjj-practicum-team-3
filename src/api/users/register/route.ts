import { NextResponse } from "next/server";
import { registerUser } from "@/actions/users"; // adjust path

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await registerUser(body);

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}