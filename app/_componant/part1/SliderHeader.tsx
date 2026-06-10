"use client"

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import Image from "next/image"

import "swiper/css"

import { ApiKey, baseUrl } from "@/app/_componant/apiConfig"

interface TvShow {
  id: number
  name: string
  poster_path: string | null
  backdrop_path: string | null
}

export default function SliderHeader({
  setBg,
}: {
  setBg: (url: string) => void
}) {
  const [movies, setMovies] = useState<TvShow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetch(`${baseUrl}/tv/popular?api_key=${ApiKey}`)

        const data = await res.json()

        setMovies(data.results ?? [])
      } catch (error) {
        console.error("Error fetching movies:", error)
      } finally {
        setLoading(false)
      }
    }

    getMovies()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full px-4">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop
        spaceBetween={16}
        breakpoints={{
          320: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <SwiperSlide key={movie.id}>
              <div
                className="relative mt-6 aspect-3/4 w-full cursor-pointer overflow-hidden rounded-xl transition-transform hover:scale-105"
                onMouseEnter={() => {
                  if (movie.backdrop_path) {
                    setBg(
                      `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                    )
                  }
                }}
              >
                <Image
                  fill
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.name}
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}
