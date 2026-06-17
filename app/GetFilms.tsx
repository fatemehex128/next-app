"use client"


import TabsMoviesSection from "@/app/_componant/TabsMoviesSection"
import FreeForWatch from "@/app/_componant/FreeForWatch"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col  text-white">

      <main className="container mx-auto flex-1  ">
        <TabsMoviesSection />

        <FreeForWatch />
      </main>

    </div>
  )
}
