import { supabase } from "@/lib/supabaseClient";
import { ITheater } from "@/types/ITheater";

export async function PATCH(
  req: Request,
  { params }: { params: { id?: string } }
) {
  const { id } = await params;
  if (!id) {
    return new Response(JSON.stringify({ error: "Missing id" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  
  const body = await req.json();
  const theater = body as ITheater;

  if (theater.name.length < 2 || theater.name.length > 100) {
    return new Response(
      JSON.stringify({ error: "Theater name must be 2–100 characters" }),
      { headers: { "Content-Type": "application/json" }, status: 400 }
    );
  }

  if (
    (theater.latitude !== undefined && typeof theater.latitude !== "number") ||
    (theater.longitude !== undefined && typeof theater.longitude !== "number")
  ) {
    return new Response(
      JSON.stringify({ error: "Latitude and longitude must be numbers" }),
      { headers: { "Content-Type": "application/json" }, status: 400 }
    );
  }
  // remove id Primary Key property
  const updates: Partial<ITheater> = { ...theater };
  delete (updates as any).id;

  //Remove null fields to avoid accidental null updates
  for (const key of Object.keys(updates)) {
    const value = (updates as any)[key];
    if (value == null) delete (updates as any)[key];
  }

  const { data, error } = await supabase
    .from("theaters")
    .update(updates)
    .eq("id", Number(id))
    .select();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing id" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { error, count } = await supabase
    .from("theaters")
    .delete({ count: "exact" })
    .eq("id", id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (!count) {
    return new Response(JSON.stringify({ error: `Theater ${id} not found` }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ message: `Theater ${id} deleted` }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
