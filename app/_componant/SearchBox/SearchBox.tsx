"use client"

import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { ApiKey, baseUrl } from "@/app/_componant/apiConfig"
import SearchMovies from "@/app/_componant/SearchBox/items/SearchMovies"
import SearchPerson from "@/app/_componant/SearchBox/items/SearchPerson"
import SearchTv from "@/app/_componant/SearchBox/items/SearchTv"

type SearchItem = {
  id: number
  media_type: "movie" | "tv" | "person"
  title?: string
  name?: string
}

export default function SearchBox() {
  const [query, setQuery] = useState("")
  const [searchResult, setSearchResult] = useState<SearchItem[]>([])

  useEffect(() => {
    if (!query.trim()) {
      setSearchResult([])
      return
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `${baseUrl}/search/multi?api_key=${ApiKey}&query=${encodeURIComponent(query)}`
        )

        const data = await res.json()
        setSearchResult(data.results ?? [])
      } catch (error) {
        console.error(error)
      }
    }, 500)

    return () => clearTimeout(timeout)
  }, [query])

  function renderSearchItem(item: SearchItem) {
    switch (item.media_type) {
      case "movie":
        return <SearchMovies key={item.id} item={item} />

      case "tv":
        return <SearchTv key={item.id} item={item} />

      case "person":
        return <SearchPerson key={item.id} item={item} />

      default:
        return null
    }
  }

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
          <div className="absolute z-10 mt-2 w-full rounded-xl bg-slate-800 p-2 opacity-98" onClick={()=>{setSearchResult([])}}>
            {searchResult.map(renderSearchItem)}
          </div>
        )}
      </div>
    </section>
  )
}
