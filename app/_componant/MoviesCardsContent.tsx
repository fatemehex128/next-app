"use client"

import { Star } from "lucide-react"
import {Heart} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
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
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="flex flex-col gap-2 p-3 text-white">
      <h1 className="text-lg">{title}</h1>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <Star size={16} />
          <span>{rating?.aggregateRating}</span>
        </div>
        <Button
          variant="ghost"
          onClick={() => {
            setIsLiked(!isLiked)
          }}
        >
          <Heart
            className={
              isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"
            }
          />
        </Button>
      </div>

      <span className="text-sm text-gray-300">{year}</span>
    </div>
  )
}
