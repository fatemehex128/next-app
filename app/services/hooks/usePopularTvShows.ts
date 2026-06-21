'use client'


import { getPopularTvShows } from '@/app/services/endpoints'
import type { ApiResponse, TvShow } from '@/app/services/types'
import { useQuery } from "@tanstack/react-query"


export function usePopularTvShows(){


  return useQuery<TvShow[]>({
    queryKey: ["tv-shows"],
    queryFn: async () => {
      const response: ApiResponse<TvShow> = await getPopularTvShows()
      return response.results ?? []
    },
  })
}
