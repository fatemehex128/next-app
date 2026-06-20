'use client'

import { useState, useEffect } from 'react'
import { getMovieDetails } from '@/app/services/endpoints'
import type { ApiMovie } from '@/app/services/types'

interface UseMovieDetailReturn {
  movie: ApiMovie | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useMovieDetail(movieId: string | number | null): UseMovieDetailReturn {
  const [movie, setMovie] = useState<ApiMovie | null>(null)
  const [loading, setLoading] = useState(!!movieId)
  const [error, setError] = useState<string | null>(null)

  const fetchMovie = async () => {
    if (!movieId) {
      setMovie(null)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await getMovieDetails(movieId)
      setMovie(data)
    } catch (err: any) {
      setError(err?.message ?? 'Failed to fetch movie details')
      setMovie(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovie()
  }, [movieId])

  return { movie, loading, error, refetch: fetchMovie }
}
