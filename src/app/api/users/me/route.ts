import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import supabase from "@/config/supabase-config";

export async function GET() {
  try {
    // Grab token from cookies
    const cookieStore = await cookies();
    const jwtToken = cookieStore.get("jwt_token")?.value;

    if (!jwtToken) {
      return NextResponse.json(
        { success: false, message: "No token found" },
        { status: 401 }
      );
    }

    // Verify JWT
    let decoded: any;
    try {
      decoded = jwt.verify(jwtToken, process.env.JWT_SECRET!);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Lookup user in Supabase
    const { data: users, error } = await supabase
      .from("users")
      .select("id, email, role")
      .eq("id", decoded.userId);

    if (error || !users || users.length === 0) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const user = users[0];

    return NextResponse.json(
      {
        success: true,
        message: "User data fetched successfully",
        data: user,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to get user" },
      { status: 500 }
    );
  }
}