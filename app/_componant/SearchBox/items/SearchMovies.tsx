"use client"

// import Link from "next/link"

export default function SearchMovies({ item }) {
  const imageUrl = `https://image.tmdb.org/t/p/w92${item.poster_path}`

  return (
    // <Link href={`Movies${item.id}`}>
      <div className="flex items-center gap-3 p-2 hover:bg-slate-700">
        <img
          src={item.poster_path ? imageUrl : "/11.png"}
          alt={item.name || "Movie image"}
          className="h-30px w-30px"
        />

        <div>
          <p className="text-white">{item.name}</p>
          <p className="text-sm text-slate-400">Movie</p>
        </div>
      </div>
    // </Link>
  )
}
