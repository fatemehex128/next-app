"use client"
import MoviesCards from "@/app/_componant/MoviesCards"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function GetFilms() {
  const [movies, setMovies] = useState<any[]>([])
  const [start, setStart] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const fetchMovies = async (startNumber: number) => {
    try {
      setLoading(true)
      const response = await fetch(
        `https://api.imdbapi.dev/titles?types=MOVIE&genres=Horror&limit=6&start=${startNumber}`
      )
      const data = await response.json()
      console.log(data)
      if (data.titles.length === 0) {
        setHasMore(false)
      } else {
        setMovies((prev) => [...prev, ...data.titles])
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(0)
  }, [])

  const loadMore = () => {
    const nextPage = start + 6
    setStart(nextPage)
    fetchMovies(nextPage)
  }

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
      <div className="flex justify-end gap-2 p-4">
        {hasMore && (
          <Button onClick={loadMore}>{loading ? "Loading..." : "More"}</Button>
        )}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>


    </>
  )
}
