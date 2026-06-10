"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Film, Tv, Smartphone, HeadphonesIcon, ShoppingBag } from "lucide-react"

export default function Footer() {
  const frameworks = [
    "Rules",
    "Come With Us",
    "Advertisement",
    "Logo",
    "Download",
  ]

  return (
    <footer className="border-t border-slate-700 bg-slate-900 text-slate-300">
      <div className="mx-auto grid w-7xl grid-cols-1 gap-10 px-8 py-12 md:grid-cols-4">
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-2">
            <Film className="h-6 w-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Hypermovies</h2>
          </div>
          <p className="text-sm text-slate-400">
            Welcome to Hypermovies — your ultimate destination for discovering,
            exploring, and celebrating the world of cinema. We are a passionate
            team of film enthusiasts who believe that every great story deserves
            to be found. Whether you’re searching for the latest blockbusters,
            timeless classics, or hidden indie gems, Hypermovies brings them all
            to one place.
            <span className="font-medium text-yellow-400">
              Discover. Watch. Remember.
            </span>
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm tracking-widest text-white uppercase">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { icon: <Tv className="h-4 w-4" />, label: "See with TV" },
              {
                icon: <Smartphone className="h-4 w-4" />,
                label: "Applications",
              },
              {
                icon: <HeadphonesIcon className="h-4 w-4" />,
                label: "Support",
              },
              { icon: <ShoppingBag className="h-4 w-4" />, label: "Store" },
            ].map(({ icon, label }) => (
              <li key={label}>
                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-yellow-400"
                >
                  {icon} {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm tracking-widest text-white uppercase">More</h3>
          <Combobox items={frameworks}>
            <ComboboxInput
              placeholder="Other links..."
              className="border-slate-600 bg-slate-800 text-slate-300 placeholder:text-slate-500"
            />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-700 py-4 text-center text-xs text-slate-500 uppercase">
        made by fatemeh eshgh amir
      </div>
    </footer>
  )
}
