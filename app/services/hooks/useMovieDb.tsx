import { useQuery } from '@tanstack/react-query'
import { getMoviesByCategory } from '@/app/services/endpoints'
import type { UseMoviesDbReturn, ApiMovie } from '@/app/services/types'

export function useMoviesDb(
  genre: string = 'popular'
): Omit<UseMoviesDbReturn, 'refetch'> & { data: ApiMovie[] | undefined } {
  return useQuery<ApiMovie[]>({
    queryKey: ['movies', genre],
    queryFn: async () => {
      const data = await getMoviesByCategory(
        genre as 'popular' | 'now_playing' | 'top_rated' | 'upcoming',
        1
      )
      return data.results ?? []
    },
  })
}
