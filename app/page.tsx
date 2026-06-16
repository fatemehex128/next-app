"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContext, useState } from "react"
import { ApiKey, baseUrl } from "@/app/_componant/apiConfig"
import { UserContext } from "@/context/userContext"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function LoginPage() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSigned, setIsSigned] = useState()

  const router = useRouter()
  const context = useContext(UserContext)

  if (!context) {
    throw new Error("LoginPage must be used within UserProvider")
  }

  const { login } = context

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      // 1️⃣ دریافت توکن
      const tokenResponse = await fetch(
        `${baseUrl}/authentication/token/new?api_key=${ApiKey}`
      )
      const tokenData = await tokenResponse.json()

      if (!tokenData.success) {
        toast.error("Authentication error")
        setLoading(false)
        return
      }

      // 2️⃣ اعتبارسنجی
      const validateResponse = await fetch(
        `${baseUrl}/authentication/token/validate_with_login?api_key=${ApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: userName,
            password: password,
            request_token: tokenData.request_token,
          }),
        }
      )

      const validateData = await validateResponse.json()

      if (!validateData.success) {
        toast.error("Login failed", {
          description: "Invalid username or password",
        })
        setLoading(false)
        return
      }

      // 3️⃣ ساخت session
      const sessionResponse = await fetch(
        `${baseUrl}/authentication/session/new?api_key=${ApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            request_token: validateData.request_token,
          }),
        }
      )

      const sessionData = await sessionResponse.json()

      if (!sessionData.success) {
        toast.error("Session creation failed")
        setLoading(false)
        return
      }

      // 4️⃣ دریافت اطلاعات کاربر
      const userResponse = await fetch(
        `${baseUrl}/account?api_key=${ApiKey}&session_id=${sessionData.session_id}`
      )

      const userData = await userResponse.json()

      // ✅ ذخیره در context
      login(sessionData.session_id, userData)

      toast.success(`Welcome ${userData.username}`, {
        description: "Login successful 🎉",
      })

      router.push("/pages")
    } catch (error) {
      toast.error("Unexpected error occurred")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (

    <div
      className="relative flex min-h-screen items-center justify-center px-6"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)),
          url("/5.jpg")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/*{isSigned?():()}*/}

      <Card className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black backdrop-blur-xl transition-all duration-300 hover:shadow-yellow-500/10">
        <CardHeader className="space-y-3 text-center">
          <CardTitle className="text-xl font-bold tracking-wide text-white">
            Welcome To HyperFilms 🎬
          </CardTitle>
          <CardDescription className="text-slate-400">
            Enter your credentials to access your dashboard
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              className="text-yellow-400 hover:text-yellow-300"
            >
              Sign Up
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">

              <div className="grid gap-2">
                <Label htmlFor="userName" className="text-slate-300">
                  Username
                </Label>
                <Input
                  id="userName"
                  type="text"
                  placeholder="your username"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="border-slate-700 bg-slate-900/60 text-white transition-all duration-200  focus:ring-2 focus:ring-yellow-400/40"
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-slate-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-slate-700 bg-slate-900/60 text-white transition-all duration-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40"
                />
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 font-semibold text-black shadow-lg shadow-yellow-500/30 transition-all duration-300 hover:scale-[1.02] hover:from-yellow-400 hover:to-orange-400 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              {/* Google Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full border-slate-600 text-slate-900 transition-all hover:border-slate-500 hover:text-white hover:bg-slate-800"
              >
                Login with Google
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
