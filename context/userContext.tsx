"use client"

import { createContext, useState, ReactNode, useEffect } from "react"
import { ApiKey, baseUrl } from "@/app/_componant/apiConfig"

interface UserContextType {
  sessionId: string | null
  isLoggedIn: boolean
  login: (sessionId: string, userData: any) => void
  logout: () => void
  user: any | null
  setUser: (user: any) => void
  addToWatchList: (movieId: number) => Promise<void>
  getWatchList: () => Promise<any[]>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export default function UserProvider({ children }: { children: ReactNode }) {
  // ۱. مقداردهی اولیه امن برای User
  const [user, setUser] = useState<any | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user")
      try {
        return saved ? JSON.parse(saved) : null
      } catch (e) {
        return null // در صورت خراب بودن فرمت JSON
      }
    }
    return null
  })
  // ۲. مقداردهی اولیه امن برای SessionId
  const [sessionId, setSessionId] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sessionId")
    }
    return null
  })

  async function addToWatchList(movieId: number) {
    if (!sessionId || !user) {
      throw new Error("User not logged in")
    }

    const response = await fetch(
      `${baseUrl}account/${user.id}/watchlist?api_key=${ApiKey}&session_id=${sessionId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          media_type: "movie",
          media_id: movieId,
          watchlist: true,
        }),
      }
    )
    if (!response.ok) {
      const errorData = await response.json()
      console.error("TMDB API Error:", errorData)
      throw new Error("Failed to add to watchlist")
    }
  }

  async function getWatchList() {
    if (!sessionId || !user) {
      return []
    }
    try {
      const watchListResponse = await fetch(
        `${baseUrl}account/${user.id}/watchlist/movies?api_key=${ApiKey}&session_id=${sessionId}`
      )
      if (!watchListResponse.ok) throw new Error("Failed to fetch watchlist")
      const data = await watchListResponse.json()
      return data.results
    } catch (error) {
      console.error("Error fetching watchlist:", error)
      return []
    }
  }

  // ۳. تابع لاگین اصلاح شده
  const login = (id: string, userData: any) => {
    setSessionId(id)
    setUser(userData)

    // ذخیره در دیتابیس مرورگر
    if (typeof window !== "undefined") {
      localStorage.setItem("sessionId", id)
      localStorage.setItem("user", JSON.stringify(userData))
    }
  }

  // ۴. تابع خروج
  const logout = () => {
    setSessionId(null)
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("sessionId")
      localStorage.removeItem("user")
    }
  }

  // محاسبه وضعیت لاگین به صورت خودکار (Derived State)
  const isLoggedIn = !!sessionId

  return (
    <UserContext.Provider
      value={{
        sessionId,
        isLoggedIn,
        login,
        logout,
        user,
        setUser,
        addToWatchList,
        getWatchList,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
