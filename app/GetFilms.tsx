"use client"


import TabsMoviesSection from "@/app/_componant/TabsMoviesSection"
import FreeForWatch from "@/app/_componant/FreeForWatch"
import TabsTvSection from "@/app/_componant/TabsTvSection"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col text-white">
      <main className="container mx-auto flex-1 p-5 *:not-last:border-2 *:not-last:border-yellow-400 *:not-last:rounded-4xl">
        <TabsMoviesSection />
        <TabsTvSection />
        <FreeForWatch />
      </main>
    </div>
  )
}
