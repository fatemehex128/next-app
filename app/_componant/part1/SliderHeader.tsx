"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules'
import Image from "next/image"

function getImage(name:string){
    return `/${name}`
}
export default function SliderHeader({setBg} : any){
    const mySliderData = [
      {
        id: 1,
        image_name: "2.jpg",
      },
      {
        id: 2,
        image_name: "3.jpg",
      },
      {
        id: 3,
        image_name: "3.jpg",
      },
      {
        id: 4,
        image_name: "2.jpg",
      },
      {
        id: 5,
        image_name: "2.jpg",
      },
      {
        id: 6,
        image_name: "2.jpg",
      },
      {
        id: 7,
        image_name: "2.jpg",
      },
    ]
    return(
      <div className="w-full px-4">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={16}
          breakpoints={{
            320:  { slidesPerView: 2 },
            480:  { slidesPerView: 3 },
            768:  { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
        >
          {mySliderData.map((v) => (
            <SwiperSlide key={v.id}>
              <div
                className="relative w-full aspect-3/4 overflow-hidden rounded-xl cursor-pointer mt-6
                     transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                onMouseOver={() => setBg(getImage(v.image_name))}
              >
                <Image
                  fill
                  sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  src={getImage(v.image_name)}
                  loading="eager"
                  alt={`Slider ${v.id}`}
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    )
}