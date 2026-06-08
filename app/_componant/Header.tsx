"use client"

import SearchBox from "@/app/_componant/part1/SearchBox"
import Navigation from "@/app/_componant/part1/Navigation"
import Follow from "@/app/_componant/part1/Follow"
import SliderHeader from "@/app/_componant/part1/SliderHeader"
import { useState } from "react"

export default function Header() {
  const [background, setBackground] = useState("/5.jpg")
  return (
    <header
      className="bg-cover bg-center bg-no-repeat py-9"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${background})`,
      }}
    >
      <Navigation />
      <SearchBox />
      <Follow />
      <SliderHeader setBg={setBackground} />
    </header>
  )
}
