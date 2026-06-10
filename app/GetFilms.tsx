"use client"
import MoviesCards from "@/app/_componant/MoviesCards"
import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApiKey, baseUrl } from "@/app/_componant/apiConfig"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function GetFilms() {
  const [movies, setMovies] = useState<any[]>([])
  const [page, setPage] = useState(1)

  const getMovies = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/tv/popular?api_key=${ApiKey}&page=${page}`
      )
      console.log(response)
      const data = await response.json()
      setMovies((prev) => [...prev, ...data.results])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMovies()
  }, [page])

  const triggerClass =
    "data-[state=active]:bg-slate-700 data-[state=active]:text-white"

  const uniqueMovies = movies
    .filter(
      (item: any, index: number, self: any[]) =>
        index === self.findIndex((m) => m.id === item.id)
    )
    .slice(0, page * 6)

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
        {uniqueMovies.map((item: any) => (
          <MoviesCards
            key={item.id}
            title={item.name}
            image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            year={item.first_air_date?.slice(0, 4)}
            rating={{
              aggregateRating: item.vote_average,
              voteCount: item.vote_count,
            }}
          />
        ))}
      </div>

      <Pagination className=" text-slate-400 hover:text-white p-1">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (page > 1) setPage(page - 1)
              }}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#"> {page}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setPage(page + 1)
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
