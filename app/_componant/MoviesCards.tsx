"use client"

import Image from "next/image"
import MoviesCardsContent from "@/app/_componant/MoviesCardsContent"
import Link from "next/link"

interface Props {
  id:number
  title: string
  image: string
  year?: string
  rating?: Rating
}
export interface Rating {
  aggregateRating: number
  voteCount: number
}
export default function MoviesCards({ id,title, image, year, rating }: Props) {
  return (
    <div className="group m-4 flex w-52 flex-col overflow-hidden rounded-2xl border border-slate-600/50 bg-slate-800 shadow-lg shadow-black/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-black/40">
      <Link href={`/pages/dataMovies/${id}`}>
        <div className="relative overflow-hidden">
          <Image
            src={image || "/9.jpg"}
            alt="movie poster"
            width={300}
            height={400}
            className="w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </Link>

      <MoviesCardsContent title={title} year={year} rating={rating} id={id} />
    </div>
  )
}
