"use client"

import type { SearchPersonProps } from "@/app/services/types"

export default function SearchPerson({ item }: SearchPersonProps) {
  const imageUrl = `https://image.tmdb.org/t/p/w92${item.profile_path}`
  const name = item.name || "Unknown"

  return (
    <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-700">
      <img
        src={item.profile_path ? imageUrl : "/12.png"}
        alt={name}
        className="h-30px w-30px rounded-full"
      />

      <div>
        <p className="text-white">{name}</p>
        <p className="text-sm text-slate-400">Person</p>
      </div>
    </div>
  )
}
