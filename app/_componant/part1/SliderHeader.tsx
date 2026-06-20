"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import Image from "next/image"
import "swiper/css"
import { usePopularTvShows } from "@/app/services/hooks"

export default function SliderHeader({
  setBg,
}: {
  setBg: (url: string) => void
}) {
  const { tvShows, loading } = usePopularTvShows()

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading...</div>
  }

  if (!tvShows || tvShows.length === 0) {
    return <div className="p-8 text-center text-slate-400">No TV shows found</div>
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
        {tvShows
          .filter((show) => show.poster_path)
          .map((show) => (
            <SwiperSlide key={show.id}>
              <div
                className="relative mt-6 aspect-3/4 w-full cursor-pointer overflow-hidden rounded-xl transition-transform hover:scale-105"
                onMouseEnter={() => {
                  if (show.backdrop_path) {
                    setBg(
                      `https://image.tmdb.org/t/p/original${show.backdrop_path}`
                    )
                  }
                }}
              >
                <Image
                  fill
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
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
