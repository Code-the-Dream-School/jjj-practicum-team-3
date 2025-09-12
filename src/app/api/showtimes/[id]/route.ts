import { NextResponse } from "next/server";
import { getShowtimesById, updateShowtimes, deleteShowtimes  } from "@/actions/showtimes";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const result = await getShowtimesById(id);
  return NextResponse.json(result);
}

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await req.json();
  const result = await updateShowtimes(id, body);
  return NextResponse.json(result);
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const result = await deleteShowtimes(id);
  return NextResponse.json(result);
}