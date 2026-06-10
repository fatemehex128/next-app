import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import {DirectionProvider} from "@/components/ui/direction";
import { Inter, Roboto } from "next/font/google"
import type { Metadata } from "next"

// Configure your primary font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Optional: Add a secondary font
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Your App",
  description: "Your app description",
};

export default function RootLayout(

  {
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
