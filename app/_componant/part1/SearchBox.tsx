"use client"

import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { ApiKey, baseUrl } from "@/app/_componant/apiConfig"

export default function SearchBox() {
  const [query, setQuery] = useState("")
  const [searchResult, setSearchResult] = useState<any[]>([])

  useEffect(() => {
    if (!query.trim()) {
      setSearchResult([])
      return
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `${baseUrl}/search/multi?api_key=${ApiKey}&query=${query}`
        )

        const data = await res.json()

        setSearchResult(data.results ?? [])
      } catch (error) {
        console.error(error)
      }
    }, 500)

    return () => clearTimeout(timeout)
  }, [query])

  return (
    <section className="container mt-12 w-full p-2 text-xl text-slate-200">
      <div className="relative mx-auto w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search for movie you are looking for"
          className="w-full rounded-2xl border-2 border-slate-700 bg-transparent p-3 pr-12 text-slate-300 outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Search className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400" />

        {searchResult.length > 0 && (
          <div className="absolute  mt-2 w-full rounded-xl bg-slate-800 p-2 z-10">
            {searchResult.map((item: any) => (
              <div key={item.id} className="p-2 hover:bg-slate-700">
                {item.title || item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
