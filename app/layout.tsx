import UserProvider from "@/context/userContext"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { DirectionProvider } from "@/components/ui/direction"
import { Toaster } from "sonner"
import { ReactQueryProvider } from "./provider"

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
        <ReactQueryProvider>
          <UserProvider>
            <DirectionProvider direction="ltr" dir="ltr">
              <ThemeProvider>
                {children}
                <Toaster position="top-center" />
              </ThemeProvider>
            </DirectionProvider>
          </UserProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
