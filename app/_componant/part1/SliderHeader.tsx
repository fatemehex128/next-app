"use client"
import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Autoplay } from "swiper/modules"
import Image from "next/image"

export default function SliderHeader({
  setBg,
}: {
  setBg: (url: string) => void
}) {
  const [movies, setMovies] = useState<any[]>([])

  useEffect(() => {
    fetch("https://api.imdbapi.dev/titles?types=MOVIE&genres=Horror")
      .then((r) => r.json())
      .then((data) => setMovies(data.titles ?? data))
  }, [])

  return (
    <div className="w-full px-4">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop
        spaceBetween={16}
        breakpoints={{
          320: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {movies.map(
          (m) =>
            m.primaryImage?.url && (
              <SwiperSlide key={m.id}>
                <div
                  className="relative mt-6 aspect-3/4 w-full cursor-pointer overflow-hidden rounded-xl transition-transform hover:scale-105"
                  onMouseOver={() => setBg(m.primaryImage.url)}
                >
                  <Image
                    fill
                    src={m.primaryImage.url}
                    alt={m.id}
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            )
        )}
      </Swiper>
    </div>
  )
}
