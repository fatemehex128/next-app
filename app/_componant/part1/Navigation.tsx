"use client"
import { Button } from "@/components/ui/button"
import {
  CreditCardIcon,
  LogOutIcon,
  Menu,
  SettingsIcon,
  UserIcon,
} from "lucide-react"
import { useContext, useState } from "react"
import Link from "next/link"
import { UserContext } from "@/context/userContext"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navigation() {
  const [openMenu, setOpenMenu] = useState(false)
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("Navigation must be used within UserProvider")
  }
  const { user, logout } = context
  const router = useRouter()

  const handelLogout = () => {
    logout()
    toast.success("You have logged out")

    router.push("/")
  }
  const handelProfile=()=>{
    router.push("/pages/profile")
  }

  return (
    <div>
      <nav className="container mt-10 text-slate-300">
        <div className="flex items-baseline">
          <h1 className="ml-12 text-3xl font-bold">
            Hyper
            <span className="text-yellow-400">Movies</span>
            <p className="mt-2 text-center text-sm text-slate-500">
              Film Review
            </p>
          </h1>

          <ul className="ml-10 hidden gap-6 md:flex">
            <li>
              <Link
                href="/pages/movies"
                className="transition-colors hover:text-white"
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                href="/pages/TvShows"
                className="transition-colors hover:text-white"
              >
                Tv Shows
              </Link>
            </li>
            <li>
              <Link
                href="/pages/people"
                className="transition-colors hover:text-white"
              >
                People
              </Link>
            </li>
            <li>
              <Link
                href="/pages/popular"
                className="transition-colors hover:text-white"
              >
                Popular
              </Link>
            </li>
            <li>
              <Link
                href="/pages/more"
                className="transition-colors hover:text-white"
              >
                More
              </Link>
            </li>
          </ul>

          {/* Desktop User Menu */}
          <div className="ml-auto hidden items-center gap-6 md:flex">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full border-slate-700 px-6 py-2 text-slate-900 hover:bg-slate-800 hover:text-slate-200"
                  >
                    {user.username}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 border-slate-700 bg-slate-900 text-slate-200"
                  align="end"
                >
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-slate-800 focus:bg-slate-800"
                    onClick={handelProfile}>
                    <UserIcon className="mr-3 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-slate-800 focus:bg-slate-800">
                    <CreditCardIcon className="mr-3 h-4 w-4" />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-slate-800 focus:bg-slate-800">
                    <SettingsIcon className="mr-3 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem
                    className="cursor-pointer text-red-400 hover:bg-red-950 focus:bg-red-950"
                    onClick={handelLogout}
                  >
                    <LogOutIcon className="mr-3 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  href="/login"
                  className="font-medium transition-colors hover:text-yellow-400"
                >
                  Login
                </Link>
                <a
                  href="#"
                  className="rounded-2xl bg-green-600 px-6 py-3 font-bold uppercase shadow-lg shadow-black/50 transition-all hover:bg-green-500"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>

          <Button
            onClick={() => setOpenMenu(!openMenu)}
            className="ml-auto text-slate-300 md:hidden"
            variant="ghost"
          >
            <Menu size={28} />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <ul
        style={{ height: openMenu ? "auto" : 0 }}
        className={`m-3 overflow-hidden rounded-xl border-t border-slate-700 bg-slate-900 text-white transition-all duration-300 md:hidden ${openMenu ? "py-6" : "py-0"}`}
      >
        <div className="flex flex-col items-center gap-6 text-lg">
          <Link href="/pages/movies" className="hover:text-yellow-400">
            MOVIES
          </Link>
          <Link href="/pages/TvShows" className="hover:text-yellow-400">
            TV SHOWS
          </Link>
          <Link href="/pages/people" className="hover:text-yellow-400">
            PEOPLE
          </Link>
          <Link href="/pages/popular" className="hover:text-yellow-400">
            POPULAR
          </Link>
          <Link href="/pages/more" className="hover:text-yellow-400">
            MORE
          </Link>

          {user ? (
            <div className="font-medium text-yellow-400">
              Hi, {user.username}
            </div>
          ) : (
            <div className="flex w-full flex-col items-center gap-4 border-t border-slate-700 pt-4">
              <Link href="/login" className="text-lg hover:text-yellow-400">
                Login
              </Link>
              <a
                href="#"
                className="w-48 rounded-2xl bg-green-600 py-3 text-center font-bold"
              >
                Sign Up
              </a>
            </div>
          )}
        </div>
      </ul>
    </div>
  )
}
