"use client"

import { useEffect, useMemo, useState } from "react"
import MoviesCards from "@/app/_componant/MoviesCards"
import { ApiKey, baseUrl } from "@/app/_componant/apiConfig"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

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

export default function FreeForWatch() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [apiPage, setApiPage] = useState(1)
  const [visibleCount, setVisibleCount] = useState(6)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getFreeMovies() {
      try {
        setIsLoading(true)

        const response = await fetch(
          `${baseUrl}/movie/popular?api_key=${ApiKey}&page=${apiPage}`
        )

        const data = await response.json()

        setMovies((prevMovies) => {
          const newMovies: Movie[] = data.results ?? []
          const mergedMovies = [...prevMovies, ...newMovies]

          return mergedMovies.filter(
            (movie, index, self) =>
              index === self.findIndex((item) => item.id === movie.id)
          )
        })
      } catch (error) {
        console.error("Error fetching free movies:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getFreeMovies()
  }, [apiPage])

  const visibleMovies = useMemo(() => {
    return movies.slice(0, visibleCount)
  }, [movies, visibleCount])

  function handleNext() {
    const nextVisibleCount = visibleCount + 6

    setVisibleCount(nextVisibleCount)

    if (nextVisibleCount > movies.length) {
      setApiPage((prevPage) => prevPage + 1)
    }
  }

  function handlePrevious() {
    setVisibleCount((prevCount) => {
      if (prevCount <= 6) return 6
      return prevCount - 6
    })
  }

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Free for watch</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {visibleMovies.map((movie) => (
          <MoviesCards
            key={movie.id}
            id={movie.id}
            title={movie.title || movie.name || "Untitled"}
            image={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/placeholder.png"
            }
            year={
              movie.release_date?.slice(0, 4) ||
              movie.first_air_date?.slice(0, 4) ||
              "N/A"
            }
            rating={{
              aggregateRating: movie.vote_average,
              voteCount: movie.vote_count,
            }}
          />
        ))}
      </div>

      <div className="mt-12 flex justify-center border-t border-slate-800 pt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(event) => {
                  event.preventDefault()
                  handlePrevious()
                }}
                className={
                  visibleCount <= 6 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            <PaginationItem>
              <span className="px-4 text-sm text-slate-300"></span>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(event) => {
                  event.preventDefault()
                  handleNext()
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {isLoading && (
        <p className="mt-4 text-center text-sm text-slate-400">
          Loading more movies...
        </p>
      )}
    </section>
  )
}
