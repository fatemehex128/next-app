"use client"

import { useMemo, useState } from "react"
import MoviesCards from "@/app/_componant/MoviesCards"
import { usePopularMovies } from "@/app/services/hooks"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function FreeForWatch() {
  const [apiPage, setApiPage] = useState(1)
  const [visibleCount, setVisibleCount] = useState(6)
  const { movies, loading } = usePopularMovies({ page: apiPage })

  const allMovies = useMemo(() => {
    if (!movies) return []
    return movies
  }, [movies])

  const visibleMovies = useMemo(() => {
    return allMovies.slice(0, visibleCount)
  }, [allMovies, visibleCount])

  function handleNext() {
    const nextVisibleCount = visibleCount + 6
    setVisibleCount(nextVisibleCount)

    if (nextVisibleCount > allMovies.length) {
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
    <section className="mb-12 p-5">
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

      {loading && (
        <p className="mt-4 text-center text-sm text-slate-400">
          Loading more movies...
        </p>
      )}
    </section>
  )
}
