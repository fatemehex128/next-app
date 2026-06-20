import Image from "next/image"
import { useImdbMovies } from "@/app/services/hooks"
import type { ImdbMovie } from "@/app/services/types"

export type Movie = ImdbMovie

async function getImdbMovies() {
  try {
    const response = await fetch(
      'https://api.imdbapi.dev/titles?types=MOVIE&genres=Horror'
    )
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch IMDB movies:', error)
    return { titles: [] }
  }
}

export default async function Page() {
  const result = await getImdbMovies()
  const movies: Movie[] = result.titles || []

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
