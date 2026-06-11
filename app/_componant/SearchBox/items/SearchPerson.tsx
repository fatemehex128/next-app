"use client"

// import Link from "next/link"

export default function SearchPerson({ item }) {
  const imageUrl = `https://image.tmdb.org/t/p/w92${item.profile_path}`


  return (
    // <Link href={`person${item.id}`}>
      <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-700">
        <img
          src={item.profile_path ? imageUrl : "/12.png"}
          alt={item.name || "Person image"}
          className="h-30px w-30px rounded-full"
        />

        <div>
          <p className="text-white">{item.name}</p>
          <p className="text-sm text-slate-400">Person</p>
        </div>
      </div>)
  //   </Link>
  // )
}
