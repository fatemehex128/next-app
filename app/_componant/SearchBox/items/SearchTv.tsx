"use client"

import type { SearchTvProps } from "@/app/services/types"

export default function SearchTv({ item }: SearchTvProps) {
  const imageUrl = `https://image.tmdb.org/t/p/w92${item.poster_path}`
  const name = item.name || item.title || "Untitled"

  return (
    <div className="flex items-center gap-3 p-2 hover:bg-slate-700">
      <img
        src={item.poster_path ? imageUrl : "/11.png"}
        alt={name}
        className="h-30px w-30px"
      />

      <div>
        <p className="text-white">{name}</p>
        <p className="text-sm text-slate-400">TV Show</p>
      </div>
    </div>
  )
}
