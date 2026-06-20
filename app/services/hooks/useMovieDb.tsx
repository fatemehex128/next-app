
import { useState, useEffect } from "react"
import { getMoviesByCategory } from "@/app/services/endpoints"
import type { UseMoviesDbReturn } from "@/app/services/types"

export function useMoviesDb(genre: string = "popular"): UseMoviesDbReturn {
  const [movies, setMovies] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const data = await getMoviesByCategory(
          genre as "popular" | "now_playing" | "top_rated" | "upcoming",
          1
        )
        setMovies(data.results)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [genre])

  return { movies, loading, error }
}
