import { NextResponse } from "next/server";
import { updateMovie, deleteMovie, getMovieById } from "@/actions/movies";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;   // ⬅️ await params
  const result = await getMovieById(id);
  return NextResponse.json(result);
}

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await req.json();
  const result = await updateMovie(id, body);
  return NextResponse.json(result);
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const result = await deleteMovie(id);
  return NextResponse.json(result);
}