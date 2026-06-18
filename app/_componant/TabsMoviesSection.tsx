"use client"

import { useEffect, useState } from "react"
import MoviesCards from "@/app/_componant/MoviesCards"
import { ApiKey, baseUrl } from "@/app/_componant/apiConfig"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Movie = {
  id: number
  title?: string
  name?: string
  poster_path: string | null
  release_date?: string
  first_air_date?: string
  vote_average: number
  vote_count: number
}

export default function TabsMoviesSection() {
  const [activeTab, setActiveTab] = useState("popular")
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getMoviesByTab() {
      try {
        setIsLoading(true)

        const response = await fetch(
          `${baseUrl}/movie/${activeTab}?api_key=${ApiKey}&page=1`
        )

        const data = await response.json()

        setMovies(data.results ?? [])
      } catch (error) {
        console.error("Error fetching tab movies:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getMoviesByTab()
  }, [activeTab])

  const triggerClass =
    "data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-slate-300"

  return (
    <section className="mb-16 bg-slate-700 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between ">
        <h2 className="text-2xl font-bold ml-4"> See in movies</h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className=" ">
          <TabsList className=" gap-2 mr-200  bg-slate-900">
            <TabsTrigger value="popular" className={triggerClass}>
              Popular
            </TabsTrigger>

            <TabsTrigger value="now_playing" className={triggerClass}>
              Now Playing
            </TabsTrigger>

            <TabsTrigger value="top_rated" className={triggerClass}>
              Top Rated
            </TabsTrigger>

            <TabsTrigger value="upcoming" className={triggerClass}>
              Upcoming
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <p className="text-slate-400">Loading movies...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {movies.slice(0, 6).map((movie) => (
            <MoviesCards
              key={movie.id}
              id={movie.id}
              title={movie.title || movie.name || "Untitled"}
              image={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/9.jpg"
              }
              rating={{
                aggregateRating: movie.vote_average,
                voteCount: movie.vote_count,
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
}
