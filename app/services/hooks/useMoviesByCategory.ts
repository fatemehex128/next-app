'use client'

import { useState, useEffect } from 'react'
import { getMoviesByCategory } from '@/app/services/endpoints'
import type { ApiResponse, ApiMovie } from '@/app/services/types'

type MovieCategory = 'popular' | 'now_playing' | 'top_rated' | 'upcoming'

interface UseMoviesByCategoryOptions {
  page?: number
}

interface UseMoviesByCategoryReturn {
  movies: ApiMovie[] | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useMoviesByCategory(
  category: MovieCategory,
  options?: UseMoviesByCategoryOptions
): UseMoviesByCategoryReturn {
  const [movies, setMovies] = useState<ApiMovie[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const page = options?.page ?? 1

  const fetchMovies = async () => {
    try {
      setLoading(true)
      setError(null)
      const response: ApiResponse<ApiMovie> = await getMoviesByCategory(category, page)
      setMovies(response.results ?? [])
    } catch (err: any) {
      setError(err?.message ?? 'Failed to fetch movies')
      setMovies(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [category, page])

  return { movies, loading, error, refetch: fetchMovies }
}
