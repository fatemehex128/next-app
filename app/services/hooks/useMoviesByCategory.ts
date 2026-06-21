"use client"

import { useQuery } from "@tanstack/react-query"
import { getMoviesByCategory } from "@/app/services/endpoints"
import type { ApiResponse, ApiMovie } from "@/app/services/types"

type MovieCategory = "popular" | "now_playing" | "top_rated" | "upcoming"

interface UseMoviesByCategoryOptions {
  page?: number
}

export function useMoviesByCategory(
  category: MovieCategory,
  options?: UseMoviesByCategoryOptions
) {
  const page = options?.page ?? 1

  return useQuery<ApiMovie[]>({
    queryKey: ["movies", category, page],

    queryFn: async () => {
      const response: ApiResponse<ApiMovie> = await getMoviesByCategory(
        category,
        page
      )

      return response.results ?? []
    },
  })
}
