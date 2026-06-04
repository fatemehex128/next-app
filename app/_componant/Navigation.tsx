"use client"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import {useState} from "react";

export default function Navigation() {

const [openMenu,setOpenMenu]=useState(false)
    return (
        <div>
        <nav className="container text-slate-300 mt-10">

            <div className="flex items-center">

                <h1 className="text-3xl ml-12 font-bold">
                    Hyper
                    <span className="text-red-500"> Movies</span>
                    <p className="text-sm mt-2 text-center text-slate-500">Film Review</p>
                </h1>


                <ul className="hidden md:flex gap-6 ml-10">
                    <li><a href="#">Movies</a></li>
                    <li><a href="#">Tv Shows</a></li>
                    <li><a href="#">People</a></li>
                    <li><a href="#">More</a></li>
                </ul>

                <ul className="hidden md:flex gap-8 ml-auto">
                    <li><a href="#">Login</a></li>
                    <li>
                        <a href="#" className="bg-rose-700 p-3 uppercase hover:bg-rose-600 font-bold rounded-2xl">
                            Sign Up
                        </a>
                    </li>
                </ul>


                <Button
                    className="md:hidden ml-auto"
                >
                    <Menu size={24} />
                </Button>
            </div>

        </nav>
        <div className={"flex flex-col justify-center gap-2 border-t-2 border-slate-800 bg-slate-900  m-3  "}>
            <ul className={""}>
                <li><a href="">MOVIES</a></li>
                <li><a href=""></a>TV SHOWS</li>
                <li><a href=""></a>CINEMA</li>
                <li><a href="">MORE</a></li>
            </ul>
        </div>
        </div>
    )
}
