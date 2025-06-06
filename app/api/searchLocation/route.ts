export async function POST(req: Request) {
  const body = await req.json();
  const { query } = body;

  if (!query.trim()) {
    return Response.json([], { status: 200 });
  }

  try {
    const result = await fetch(
      `${process.env.API_SEARCH_URL}?q=${query}&limit=10&appid=${process.env.API_KEY}`
    );
    const locations = await result.json();
    return Response.json(locations, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Failed to search" }, { status: 500 });
  }
}
