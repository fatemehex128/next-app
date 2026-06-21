'use client'

import { getPopularMovies } from '@/app/services/endpoints'
import type { ApiMovie, ApiResponse } from "@/app/services/types"
import { useQuery } from "@tanstack/react-query"

interface UsePopularMoviesOptions {
  page?: number
}

export function usePopularMovies(
  options?: UsePopularMoviesOptions) {

  const page = options?.page ?? 1

  return useQuery({
    queryKey: ["movies", page],
    queryFn: async () => {
      const response: ApiResponse<ApiMovie> = await getPopularMovies(page)

      return response.results ?? []
    },
  })
}
