"use client"

import { Star } from "lucide-react"
import {Heart} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useContext, useState } from "react"
import { UserContext } from "@/context/userContext"

interface Props {
  title: string
  year?: string
  rating?: Rating
}
export interface Rating {
  aggregateRating: number
  voteCount: number
}
export default function MoviesCardsContent({ title, year, rating }: Props) {
  const [isLiked, setIsLiked] = useState(false)

  const context = useContext(UserContext)

  if (!context) {
    throw new Error("LoginPage must be used within UserProvider")
  }

  const { login } = context
function handelWatchList(){

}

  return (
    <div className="flex flex-col gap-2 p-3 text-white">
      <h1 className="text-lg">{title}</h1>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <span>{rating?.aggregateRating.toFixed(1)}</span>
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

      {login ? (
        <Button onClick={handelWatchList}>add to watchList</Button>
      ) : (
        <span className="text-sm text-gray-300">{year}</span>
      )}
    </div>
  )
}
