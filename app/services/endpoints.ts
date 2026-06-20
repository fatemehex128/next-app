import { ApiKey, baseUrl } from "@/app/_componant/apiConfig"

// ============================================================================
// AUTHENTICATION ENDPOINTS
// ============================================================================

/**
 * Get authentication token
 */
export async function getAuthenticationToken() {
  const response = await fetch(
    `${baseUrl}/authentication/token/new?api_key=${ApiKey}`
  )
  return response.json()
}

/**
 * Validate token with login credentials
 */
export async function validateTokenWithLogin(
  username: string,
  password: string,
  requestToken: string
) {
  const response = await fetch(
    `${baseUrl}/authentication/token/validate_with_login?api_key=${ApiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        request_token: requestToken,
      }),
    }
  )
  return response.json()
}

/**
 * Create session from validated token
 */
export async function createSession(requestToken: string) {
  const response = await fetch(
    `${baseUrl}/authentication/session/new?api_key=${ApiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        request_token: requestToken,
      }),
    }
  )
  return response.json()
}

/**
 * Get user account information
 */
export async function getUserAccount(sessionId: string) {
  const response = await fetch(
    `${baseUrl}/account?api_key=${ApiKey}&session_id=${sessionId}`
  )
  return response.json()
}

// ============================================================================
// MOVIES ENDPOINTS
// ============================================================================

/**
 * Get popular movies with pagination
 */
export async function getPopularMovies(page: number = 1) {
  const response = await fetch(
    `${baseUrl}/movie/popular?api_key=${ApiKey}&page=${page}`
  )
  return response.json()
}

/**
 * Get movies by category (popular, now_playing, top_rated, upcoming)
 */
export async function getMoviesByCategory(
  category: "popular" | "now_playing" | "top_rated" | "upcoming",
  page: number = 1
) {
  const response = await fetch(
    `${baseUrl}/movie/${category}?api_key=${ApiKey}&page=${page}`
  )
  return response.json()
}

/**
 * Get movie details by ID
 */
export async function getMovieDetails(movieId: string | number) {
  const response = await fetch(`${baseUrl}/movie/${movieId}?api_key=${ApiKey}`, {
    next: { revalidate: 3600 },
  })
  return response.json()
}

// ============================================================================
// TV SHOWS ENDPOINTS
// ============================================================================

/**
 * Get popular TV shows
 */
export async function getPopularTvShows() {
  const response = await fetch(`${baseUrl}/tv/popular?api_key=${ApiKey}`)
  return response.json()
}

/**
 * Get TV shows by category (popular, on_the_air, airing_today, top_rated)
 */
export async function getTvShowsByCategory(
  category:
    | "popular"
    | "on_the_air"
    | "airing_today"
    | "top_rated"
    | "On The Air"
    | "Aring-Today"
    | "Top Rated",
  page: number = 1
) {
  const response = await fetch(
    `${baseUrl}/tv/${category}?api_key=${ApiKey}&page=${page}`
  )
  return response.json()
}

// ============================================================================
// SEARCH ENDPOINTS
// ============================================================================

/**
 * Search for movies, TV shows, and people
 */
export async function searchMulti(query: string, page: number = 1) {
  const response = await fetch(
    `${baseUrl}/search/multi?api_key=${ApiKey}&query=${encodeURIComponent(query)}&page=${page}`
  )
  return response.json()
}

// ============================================================================
// EXTERNAL APIS
// ============================================================================

/**
 * Get IMDB movies by genre
 */
export async function getImdbMoviesByGenre(genre: string = "Horror") {
  const response = await fetch(
    `https://api.imdbapi.dev/titles?types=MOVIE&genres=${genre}`
  )
  return response.json()
}
