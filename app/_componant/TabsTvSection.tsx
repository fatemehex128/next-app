"use client"

import { useState } from "react"
import MoviesCards from "@/app/_componant/MoviesCards"
import { useTvShowsByCategory } from "@/app/services/hooks"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type TvCategory =
  | "popular"
  | "on_the_air"
  | "airing_today"
  | "top_rated"
  | "On The Air"
  | "Aring-Today"
  | "Top Rated"

export default function TabsTvSection() {
  const [activeTab, setActiveTab] = useState<TvCategory>("popular")
  const { data: tvShows, isLoading } = useTvShowsByCategory(activeTab)

  const triggerClass =
    "data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-slate-300"

  return (
    <section className="mb-16 bg-slate-700 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="ml-4 text-2xl font-bold">See in Animations</h2>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TvCategory)}>
          <TabsList className="gap-2 bg-slate-900">
            <TabsTrigger value="popular" className={triggerClass}>
              Popular
            </TabsTrigger>
            <TabsTrigger value="On The Air" className={triggerClass}>
              On The Air
            </TabsTrigger>
            <TabsTrigger value="Aring-Today" className={triggerClass}>
              Airing Today
            </TabsTrigger>
            <TabsTrigger value="Top Rated" className={triggerClass}>
              Top Rated
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <p className="text-slate-400">Loading TV shows...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {tvShows?.slice(0, 6).map((show) => (
            <MoviesCards
              key={show.id}
              id={show.id}
              title={show.name || show.title || "Untitled"}
              image={
                show.poster_path
                  ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                  : "/9.jpg"
              }
              rating={{
                aggregateRating: show.vote_average,
                voteCount: show.vote_count,
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
}
