'use client'
import { getImdbMoviesByGenre } from '@/app/services/endpoints'
import { useQuery } from "@tanstack/react-query"
export function useImdbMovies(genre = 'Horror') {

  return useQuery({
    queryKey:['movies',genre],
    queryFn:async()=>{
      const response = await getImdbMoviesByGenre(genre)
      return response.title??[]
    }
  })
}
