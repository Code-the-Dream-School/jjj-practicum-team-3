type Movie = {
    id: number
    Title: string
    Year: string
    RunTime: string
    Genre: string
    Director: string
    Actors: string
    Description: string
    Country: string
    Poster: string
    ComingSoon: boolean
  }
  
  export default async function MoviesPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`, {
      cache: 'no-store',
    })
    const movies: Movie[] = await res.json()
  
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">🎬 Movies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((m) => (
            <div key={m.id} className="border rounded-lg shadow p-4">
              <img
                src={`/images/${m.Poster}`}
                alt={m.Title}
                className="w-full h-64 object-cover mb-2"
              />
              <h2 className="text-lg font-semibold">
                {m.Title} ({m.Year})
              </h2>
              <p className="text-sm text-gray-600">
                {m.RunTime} · {m.Genre}
              </p>
              <p className="mt-2 text-sm">{m.Description}</p>
            </div>
          ))}
        </div>
      </main>
    )
  }