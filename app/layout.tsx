import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import {DirectionProvider} from "@/components/ui/direction";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
          "antialiased",
          "font-sans")}
    >
      <body  className={"bg-slate-800"}>
        <DirectionProvider direction="ltr" dir={"ltr"}>
          <ThemeProvider>
            
            {children}
            </ThemeProvider>
        </DirectionProvider>
      </body>
    </html>
  )
}
