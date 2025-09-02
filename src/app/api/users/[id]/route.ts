import { NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient";

// GET /api/users/:id
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from("users")
    .select("id, username")
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data, { status: 200 });
}

// PUT /api/users/:id
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { username, password } = body;

  const { data, error } = await supabase
    .from("users")
    .update({ username, password })
    .eq("id", params.id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data[0], { status: 200 });
}

// DELETE /api/users/:id
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { error } = await supabase.from("users").delete().eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
}
