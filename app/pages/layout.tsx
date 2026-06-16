import Navigation from "@/app/_componant/part1/Navigation"
import Footer from "@/app/_componant/Footer"

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}
