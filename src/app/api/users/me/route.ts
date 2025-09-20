import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import supabase from "@/config/supabase-config";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("jwt_token")?.value; // ✅ no await

    if (!token) {
      return NextResponse.json({ success: false, message: "No token found" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, username, role")
      .eq("id", decoded.userId)
      .single();

    if (error || !user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
