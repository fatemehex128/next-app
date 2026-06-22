"use client"

import { Search } from "lucide-react"
import { useSearch } from "@/app/services/hooks"
import SearchMovies from "@/app/_componant/SearchBox/items/SearchMovies"
import SearchPerson from "@/app/_componant/SearchBox/items/SearchPerson"
import SearchTv from "@/app/_componant/SearchBox/items/SearchTv"

export default function SearchBox() {
  const { results, search, clearResults, isLoading } = useSearch({
    debounceMs: 500,
  })

  return (
    <section className="container mt-12 w-full p-2 text-xl text-slate-200">
      <div className="relative mx-auto w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search for movie you are looking for"
          className="w-full rounded-2xl border-2 border-slate-700 bg-transparent p-3 pr-12 text-slate-300 outline-none"
          onChange={(e) => search(e.target.value)}
        />

        <Search className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400" />

        {isLoading && (
          <div className="absolute z-10 mt-2 w-full rounded-xl bg-slate-800 p-2 opacity-98">
            <p className="p-4 text-center text-slate-400">Searching...</p>
          </div>
        )}

        {results && results.length > 0 && (
          <div
            className="absolute z-10 mt-2 w-full rounded-xl bg-slate-800 p-2 opacity-98"
            onClick={clearResults}
          >
            {results.map((item) => {
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
            })}
          </div>
        )}
      </div>
    </section>
  )
}
