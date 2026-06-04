"use client"

import SearchBox from "@/app/_componant/SearchBox";
import Navigation from "@/app/_componant/Navigation";
import Follow from "@/app/_componant/Follow";
import SliderHeader from "@/app/_componant/SliderHeader";
import {useState} from "react"

export default function Header() {
  const [background, setBackground] = useState("/5.jpg")
  return (
    <div>
             <header className={"py-9"} style={{
                 backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${background})`,
                 backgroundRepeat:"no-repeat",
                  backgroundSize: "cover",
                 backgroundPosition: "center"

               }}>

        <Navigation/>
        <SearchBox/>
        <Follow/>
        <SliderHeader setBg={setBackground}/>
        </header>
    </div>


  )
}
