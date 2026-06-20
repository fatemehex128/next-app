"use client"

import { useState } from "react"
import MoviesCards from "@/app/_componant/MoviesCards"
import { useMoviesByCategory } from "@/app/services/hooks"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type MovieCategory = "popular" | "now_playing" | "top_rated" | "upcoming"

export default function TabsMoviesSection() {
  const [activeTab, setActiveTab] = useState<MovieCategory>("popular")
  const { movies, loading } = useMoviesByCategory(activeTab)

  const triggerClass =
    "data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-slate-300"

  return (
    <section className="mb-16 bg-slate-700 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="ml-4 text-2xl font-bold">See in movies</h2>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as MovieCategory)}>
          <TabsList className="gap-2 bg-slate-900">
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

      {loading ? (
        <p className="text-slate-400">Loading movies...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {movies?.slice(0, 6).map((movie) => (
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
