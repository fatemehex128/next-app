import UserProvider from "@/context/userContext"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { DirectionProvider } from "@/components/ui/direction"
import Navigation from "@/app/_componant/part1/Navigation"
import Footer from "@/app/_componant/Footer"
import { Toaster } from "sonner"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", "font-sans")}
    >
      <body className="bg-slate-800">
        <UserProvider>
          <DirectionProvider direction="ltr" dir="ltr">
            <ThemeProvider>
              {children}
              <Toaster position={"top-center"}/>
            </ThemeProvider>
          </DirectionProvider>
        </UserProvider>
      </body>
    </html>
  )
}
