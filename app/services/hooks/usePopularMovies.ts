'use client'

import { useState, useEffect } from 'react'
import { getPopularMovies } from '@/app/services/endpoints'
import type { ApiResponse, ApiMovie } from '@/app/services/types'

interface UsePopularMoviesOptions {
  page?: number
}

interface UsePopularMoviesReturn {
  movies: ApiMovie[] | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function usePopularMovies(
  options?: UsePopularMoviesOptions
): UsePopularMoviesReturn {
  const [movies, setMovies] = useState<ApiMovie[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const page = options?.page ?? 1

  const fetchMovies = async () => {
    try {
      setLoading(true)
      setError(null)
      const response: ApiResponse<ApiMovie> = await getPopularMovies(page)
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
  }, [page])

  return { movies, loading, error, refetch: fetchMovies }
}
