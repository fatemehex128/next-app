"use client"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function Navigation() {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <div>
      <nav className="container mt-10 text-slate-300">
        <div className="flex items-baseline">
          <h1 className="ml-12 text-3xl font-bold">
            Hyper
            <span className="text-yellow-400"> Movies</span>
            <p className="mt-2 text-center text-sm text-slate-500">
              Film Review
            </p>
          </h1>

          <ul className="ml-10 hidden gap-6 md:flex">
            <li>
              <Link href="/movies" className="hover:text-white">
                Movies
              </Link>
            </li>
            <li>
              <Link href="/TvShows" className="hover:text-white">
                Tv Shows
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                People
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                More
              </a>
            </li>
          </ul>

          <ul className="ml-auto hidden gap-8 md:flex">
            <li className="hover:text-yellow-400">
              <a href="#">Login</a>
            </li>
            <li>
              <a
                href="#"
                className="mr-10 rounded-2xl bg-green-600 p-3 font-bold uppercase shadow-black text-shadow-xs hover:bg-green-500"
              >
                Sign Up
              </a>
            </li>
          </ul>

          <Button
            onClick={() => {
              setOpenMenu(!openMenu)
            }}
            className="ml-auto md:hidden"
          >
            <Menu size={24} />
          </Button>
        </div>
      </nav>
      <div
        style={{ height: openMenu ? 255 : 0 }}
        className={`m-3 flex flex-col justify-center border-slate-400 bg-slate-900 text-white md:hidden ${openMenu ? "h-full border-t-2 py-4" : "h-0 overflow-hidden border-none py-0"}`}
      >
        <ul className={"flex flex-col items-center gap-2"}>
          <li>
            <a href="">MOVIES</a>
          </li>
          <li>
            <a href=""></a>TV SHOWS
          </li>
          <li>
            <a href=""></a>CINEMA
          </li>
          <li>
            <a href="">MORE</a>
          </li>
        </ul>
        <div className="mt-8 flex justify-center gap-4 border-t-2 border-slate-400 pt-5">
          <a href="">login</a>
          <a href="" className="gap-4pt-4 rounded-xl bg-rose-600 p-1">
            {" "}
            sign up
          </a>
        </div>
      </div>
    </div>
  )
}
