//GET, PATCH, DELETE
export async function GET({ params }: { params: { id: string } }) {
  return new Response(
    JSON.stringify({ message: `Movie with id: ${params.id}` }),
    {
      headers: { "Content-Type": "application/json" },
      status: 200,
    }
  );
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  return new Response(
    JSON.stringify(`Movie with id ${params.id} has been updated: ` + body),
    {
      headers: { "Content-Type": "application/json" },
      status: 204,
    }
  );
}

export async function DELETE({ params }: { params: { id: string } }) {
  return new Response(
    JSON.stringify({ message: `Movie with ID ${params.id} has been deleted` }),
    {
      headers: { "Content-Type": "application/json" },
      status: 204,
    }
  );
}
