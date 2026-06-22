'use client'

import { useQuery } from '@tanstack/react-query'
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

export function useTvShowsByCategory(
  category: TvCategory,
  options?: UseTvShowsByCategoryOptions
) {
  const page = options?.page ?? 1

  return useQuery<ApiTv[]>({
    queryKey: ['tv-shows', category, page],
    queryFn: async () => {
      const response: ApiResponse<ApiTv> = await getTvShowsByCategory(
        category as any,
        page
      )
      return response.results ?? []
    },
  })
}
