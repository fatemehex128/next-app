"use client"

import SearchBox from "@/app/_componant/SearchBox/SearchBox"
import Follow from "@/app/_componant/part1/Follow"
import SliderHeader from "@/app/_componant/part1/SliderHeader"
import { useState } from "react"

export default function Header() {
  const [background, setBackground] = useState("/5.jpg")


  return (
    <header
      className="bg-cover bg-center bg-no-repeat py-20"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${background})`,
      }}
    >
            <SearchBox />
            <Follow />
            <SliderHeader setBg={setBackground} />
    </header>
  )
}
