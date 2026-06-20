'use client'

import { useState, useEffect } from 'react'
import { getImdbMoviesByGenre } from '@/app/services/endpoints'
import type { ImdbMovie } from '@/app/services/types'

interface UseImdbMoviesOptions {
  genre?: string
}

interface UseImdbMoviesReturn {
  movies: ImdbMovie[] | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useImdbMovies(options?: UseImdbMoviesOptions): UseImdbMoviesReturn {
  const [movies, setMovies] = useState<ImdbMovie[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const genre = options?.genre ?? 'Horror'

  const fetchMovies = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getImdbMoviesByGenre(genre)
      setMovies(response.titles ?? [])
    } catch (err: any) {
      setError(err?.message ?? 'Failed to fetch IMDB movies')
      setMovies(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [genre])

  return { movies, loading, error, refetch: fetchMovies }
}
