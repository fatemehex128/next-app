import Image from "next/image"

export interface Movie {
  id: string
  type: string
  primaryTitle: string
  originalTitle: string
  primaryImage: MovieImage
  startYear: number
  runtimeSeconds: number
  genres: string[]
  rating: Rating
  plot: string
}

export interface MovieImage {
  url: string
  width: number
  height: number
}

export interface Rating {
  aggregateRating: number
  voteCount: number
}

export default async function Page() {
  const apiMovies = await fetch(
    "https://api.imdbapi.dev/titles?types=MOVIE&genres=Horror"
  )

  const finalMoviesResult = await apiMovies.json()
  const movies: Movie[] = finalMoviesResult.titles

  return (
    <div className="min-h-screen bg-neutral-900 p-10">
      <div className="flex flex-wrap justify-center gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="w-44 overflow-hidden rounded-xl bg-neutral-800 shadow-lg transition hover:scale-105"
          >
            <div className="relative aspect-2/3">
              {movie.primaryImage && (
                <Image
                  src={movie.primaryImage.url}
                  alt={movie.primaryTitle}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="p-3">
              <h2 className="line-clamp-2 text-sm font-semibold text-white">
                {movie.primaryTitle}
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                ⭐ {movie.rating?.aggregateRating} • {movie.startYear}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
