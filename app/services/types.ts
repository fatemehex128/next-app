/**
 * API Response Types
 */

// ============================================================================
// MOVIE TYPES
// ============================================================================

export type ApiMovie = {
  id: number
  title?: string
  name?: string
  poster_path: string | null
  backdrop_path?: string | null
  release_date?: string
  first_air_date?: string
  vote_average: number
  vote_count: number
  aggregateRating?: number
  overview?: string
  genre_ids?: number[]
  original_language?: string
  popularity?: number
}

export type Movie = {
  id: number | string
  title?: string
  name?: string
  poster_path: string | null
  release_date?: string
  first_air_date?: string
  vote_average: number
  vote_count: number
  type?: string
  originalTitle?: string
  primaryTitle?: string
  primaryImage?: MovieImage
  startYear?: number
  runtimeSeconds?: number
  genres?: string[]
  plot?: string
}

// ============================================================================
// TV SHOW TYPES
// ============================================================================

export type ApiTv = {
  id: number
  title?: string
  name?: string
  poster_path: string | null
  backdrop_path?: string | null
  release_date?: string
  first_air_date?: string
  vote_average: number
  vote_count: number
  overview?: string
  genre_ids?: number[]
  original_language?: string
  popularity?: number
}

export type Tv = {
  id: number
  title?: string
  name?: string
  poster_path: string | null
  release_date?: string
  first_air_date?: string
  vote_average: number
  vote_count: number
}

export type TvShow = {
  id: number
  name: string
  poster_path: string | null
  backdrop_path: string | null
}

// ============================================================================
// PERSON TYPES
// ============================================================================

export interface ApiPerson {
  id: number
  name: string
  profile_path: string | null
  known_for_department: string
  known_for?: ApiMovie[] | ApiTv[]
  popularity?: number
  adult?: boolean
}

// ============================================================================
// SEARCH TYPES
// ============================================================================

export type MediaType = "movie" | "tv" | "person"

export type MediaContent = ApiMovie | ApiTv | ApiPerson

export type SearchItem = {
  id: number
  media_type: "movie" | "tv" | "person"
  title?: string
  name?: string
  poster_path?: string | null
  profile_path?: string | null
  [key: string]: any
}

// ============================================================================
// SEARCH COMPONENT PROPS
// ============================================================================

export interface SearchMovieProps {
  item: {
    id: number
    title?: string
    name?: string
    poster_path?: string | null
    [key: string]: any
  }
}

export interface SearchTvProps {
  item: {
    id: number
    name?: string
    title?: string
    poster_path?: string | null
    [key: string]: any
  }
}

export interface SearchPersonProps {
  item: {
    id: number
    name?: string
    profile_path?: string | null
    [key: string]: any
  }
}

// ============================================================================
// EXTERNAL API TYPES (IMDB)
// ============================================================================

export interface MovieImage {
  url: string
  width: number
  height: number
}

export interface Rating {
  aggregateRating: number
  voteCount: number
}

export interface ImdbMovie {
  id: string
  type: string
  primaryTitle: string
  originalTitle: string
  primaryImage: MovieImage
  startYear: number
  runtimeSeconds: number
  genres: string[]
  rating: Rating
  plot: string
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  page?: number
  results: T[]
  total_pages?: number
  total_results?: number
  success?: boolean
  status_code?: number
  status_message?: string
}

export interface AuthResponse {
  success: boolean
  request_token?: string
  expires_at?: string
  session_id?: string
  status_message?: string
}

export interface UserAccount {
  id: number
  username: string
  name?: string
  avatar?: {
    gravatar: {
      hash: string
    }
  }
  include_adult: boolean
}

// ============================================================================
// HOOK RETURN TYPES
// ============================================================================

export interface UseMoviesDbReturn {
  movies: ApiMovie[] | null
  loading: boolean
  error: string | null
}

export interface UseMovieDbOptions {
  genre?: string
  page?: number
}
