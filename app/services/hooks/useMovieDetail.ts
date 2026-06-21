"use client"

import { useQuery } from "@tanstack/react-query"
import { getMovieDetails } from "@/app/services/endpoints"

export function useMovieDetail(movieId: string | number | null) {
  return useQuery({
    queryKey: ["movie", movieId],

    queryFn: () => getMovieDetails(movieId!),

    enabled: !!movieId,
  })
}
