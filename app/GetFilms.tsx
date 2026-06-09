"use client"
import MoviesCards from "@/app/_componant/MoviesCards"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GetFilms() {
  const [movies, setMovies] = useState<any[]>([])

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.imdbapi.dev/titles?types=MOVIE&genres=Horror`
      )
      const data = await response.json()
      setMovies((prev) => [...prev, ...data.titles])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  const triggerClass =
    "data-[state=active]:bg-slate-700 data-[state=active]:text-white"

  return (
    <>
      <Tabs defaultValue="Streaming" className="mx-5 my-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-100">What is popular</h1>
          <TabsList>
            <TabsTrigger value="Streaming" className={triggerClass}>
              Streaming
            </TabsTrigger>
            <TabsTrigger value="On Tv" className={triggerClass}>
              On Tv
            </TabsTrigger>
            <TabsTrigger value="for Rent" className={triggerClass}>
              for Rent
            </TabsTrigger>
            <TabsTrigger value="In Theater" className={triggerClass}>
              In Theater
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {movies.map((item: any) => (
          <MoviesCards
            key={item.id}
            title={item.title}
            image={item.primaryImage?.url}
            year={item.releaseYear?.year}
            rating={item.rating}
          />
        ))}
      </div>
    </>
  )
}
