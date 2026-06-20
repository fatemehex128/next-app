"use client"

import type { SearchMovieProps } from "@/app/services/types"

export default function SearchMovies({ item }: SearchMovieProps) {
  const imageUrl = `https://image.tmdb.org/t/p/w92${item.poster_path}`
  const title = item.title || item.name || "Untitled"

  return (
    <div className="flex items-center gap-3 p-2 hover:bg-slate-700">
      <img
        src={item.poster_path ? imageUrl : "/11.png"}
        alt={title}
        className="h-30px w-30px"
      />

      <div>
        <p className="text-white">{title}</p>
        <p className="text-sm text-slate-400">Movie</p>
      </div>
    </div>
  )
}
