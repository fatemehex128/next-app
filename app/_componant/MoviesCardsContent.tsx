"use client"

import { Star } from "lucide-react"
interface Props {
  title: string
  year?: number
  rating?: Rating
}
export interface Rating {
  aggregateRating: number
  voteCount: number
}
export default function MoviesCardsContent({ title, year, rating }: Props) {
  return (
    <div className="flex flex-col gap-2 p-3 text-white">
      <h1 className="text-lg">{title}</h1>

      <div className="flex items-center gap-1">
        <Star size={16} />
        <span>{rating?.aggregateRating}</span>
      </div>

      <span className="text-sm text-gray-300">{year}</span>
    </div>
  )
}
