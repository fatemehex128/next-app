"use client"

import { Search } from "lucide-react"

export default function SearchBox() {
  return (
    <section className="container mt-12 p-2 text-xl text-slate-200  w-full">
      <div className="relative w-full max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search for movie you are looking for"
          className="w-full rounded-2xl border-2 border-slate-700 bg-transparent p-3 pr-12 text-slate-300 outline-none"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
      </div>
    </section>
  )
}
