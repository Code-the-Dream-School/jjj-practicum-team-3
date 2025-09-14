import { NextResponse } from "next/server";
import supabase from "@/config/supabase-config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // 1. Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email.toLowerCase().trim())
      .single();

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert user
    const { data, error } = await supabase.from("users").insert([
      {
        username,
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: "user",
        is_active: true,
      },
    ]).select().single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 4. Create JWT
    const token = jwt.sign(
      { userId: data.id, email: data.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // 5. Send response with cookie
    const response = NextResponse.json({
      success: true,
      message: "User registered successfully",
      user: { id: data.id, email: data.email, username: data.username },
      token,
    });

    response.cookies.set("jwt_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}