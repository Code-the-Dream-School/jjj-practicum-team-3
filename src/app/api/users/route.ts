import { NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient.js";

// GET /api/users - fetch all users
export async function GET() {
  const { data, error } = await supabase.from("users").select("id, username");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

// POST /api/users - create new user
export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("users")
    .insert([{ username, password }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data[0], { status: 201 });
}