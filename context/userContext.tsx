"use client"

import { createContext, useState, ReactNode, useEffect } from "react"

interface UserContextType {
  sessionId: string | null
  isLoggedIn: boolean
  login: (sessionId: string, userData: any) => void
  logout: () => void
  user: any | null
  setUser: (user: any) => void
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




  useEffect(() => {
    if (sessionId){}




  }, [sessionId])




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
      value={{ sessionId, isLoggedIn, login, logout, user, setUser }}
    >
      {children}
    </UserContext.Provider>
  )
}
