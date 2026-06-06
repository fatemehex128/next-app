"use client"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navigation() {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <div>
      <nav className="container mt-10 text-slate-300">
        <div className="flex items-center">
          <h1 className="ml-12 text-3xl font-bold">
            Hyper
            <span className="text-red-500"> Movies</span>
            <p className="mt-2 text-center text-sm text-slate-500">
              Film Review
            </p>
          </h1>

          <ul className="ml-10 hidden gap-6 md:flex">
            <li>
              <a href="#">Movies</a>
            </li>
            <li>
              <a href="#">Tv Shows</a>
            </li>
            <li>
              <a href="#">People</a>
            </li>
            <li>
              <a href="#">More</a>
            </li>
          </ul>

          <ul className="ml-auto hidden gap-8 md:flex">
            <li>
              <a href="#">Login</a>
            </li>
            <li>
              <a
                href="#"
                className="rounded-2xl bg-rose-700 p-3 font-bold uppercase mr-10 hover:bg-rose-600"
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
        className={` m-3 flex flex-col justify-center border-slate-400 bg-slate-900 text-white md:hidden ${openMenu ? "h-full border-t-2 py-4" : "h-0 overflow-hidden border-none py-0"}`}
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
