'use client'

import { useState, useEffect } from 'react'
import { getPopularTvShows } from '@/app/services/endpoints'
import type { ApiResponse, TvShow } from '@/app/services/types'

interface UsePopularTvShowsReturn {
  tvShows: TvShow[] | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function usePopularTvShows(): UsePopularTvShowsReturn {
  const [tvShows, setTvShows] = useState<TvShow[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTvShows = async () => {
    try {
      setLoading(true)
      setError(null)
      const response: ApiResponse<TvShow> = await getPopularTvShows()
      setTvShows(response.results ?? [])
    } catch (err: any) {
      setError(err?.message ?? 'Failed to fetch TV shows')
      setTvShows(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTvShows()
  }, [])

  return { tvShows, loading, error, refetch: fetchTvShows }
}
