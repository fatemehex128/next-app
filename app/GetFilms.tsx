"use client"
import MoviesCards from "@/app/_componant/MoviesCards"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import {MoreHorizontal} from "lucide-react"

export default function GetFilms() {
  const [movies, setMovies] = useState<any[]>([])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    fetch("https://api.imdbapi.dev/titles?types=MOVIE&genres=Horror")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.titles)
      })
  }, [])

  const visibleMovies = showAll ? movies : movies.slice(0, 6)

  return (
    <>
      <div className="flex flex-wrap">
        {visibleMovies.map((item: any) => (
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
        {showAll ? (
          <Button onClick={() => setShowAll(false)}>Less</Button>
        ) : (
          movies.length > 6 && (
            <Button onClick={() => setShowAll(true)}>
              More <MoreHorizontal />
            </Button>
          )
        )}
      </div>
    </>
  )
}
