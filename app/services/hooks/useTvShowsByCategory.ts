'use client'

import { useState, useEffect } from 'react'
import { getTvShowsByCategory } from '@/app/services/endpoints'
import type { ApiResponse, ApiTv } from '@/app/services/types'

type TvCategory =
  | 'popular'
  | 'on_the_air'
  | 'airing_today'
  | 'top_rated'
  | 'On The Air'
  | 'Aring-Today'
  | 'Top Rated'

interface UseTvShowsByCategoryOptions {
  page?: number
}

interface UseTvShowsByCategoryReturn {
  tvShows: ApiTv[] | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useTvShowsByCategory(
  category: TvCategory,
  options?: UseTvShowsByCategoryOptions
): UseTvShowsByCategoryReturn {
  const [tvShows, setTvShows] = useState<ApiTv[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const page = options?.page ?? 1

  const fetchTvShows = async () => {
    try {
      setLoading(true)
      setError(null)
      const response: ApiResponse<ApiTv> = await getTvShowsByCategory(category as any, page)
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
  }, [category, page])

  return { tvShows, loading, error, refetch: fetchTvShows }
}
