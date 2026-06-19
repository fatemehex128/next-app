import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Film, Heart, Star, PenSquare, Settings } from "lucide-react"


export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#07132d] text-white">
      <div className="container mx-auto px-6 py-10">
        <Card className="border-yellow-500/20 bg-white/5 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <Avatar className="h-32 w-32 border-4 border-yellow-500">
                <AvatarImage src="/avatar.jpg" />
                <AvatarFallback>FA</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h1 className="text-4xl font-bold text-slate-200">Fatemeh</h1>

                <p className="mt-2 text-slate-300">
                  Movie enthusiast • Reviewer • Collector
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge className="bg-yellow-500 text-black">
                    Premium Member
                  </Badge>

                  <Badge variant="secondary">120 Favorites</Badge>
                </div>
              </div>

              <Button className="bg-yellow-500 text-black hover:bg-yellow-400">
                <Settings className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <Card className="border-white/10 bg-white/5">
            <CardContent className="flex items-center gap-4 p-6">
              <Film className="text-yellow-500" />
              <div>
                <p className="text-sm text-slate-300">Watched</p>
                <h3 className="text-2xl font-bold text-slate-400">1,248</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5">
            <CardContent className="flex items-center gap-4 p-6">
              <Heart className="text-red-500" />
              <div>
                <p className="text-sm text-slate-300">Favorites</p>
                <h3 className="text-2xl font-bold text-slate-400">120</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5">
            <CardContent className="flex items-center gap-4 p-6">
              <Star className="text-yellow-500" />
              <div>
                <p className="text-sm text-slate-300">Average Rating</p>
                <h3 className="text-2xl font-bold text-slate-400">8.7</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5">
            <CardContent className="flex items-center gap-4 p-6">
              <PenSquare className="text-blue-400" />
              <div>
                <p className="text-sm text-slate-300">Reviews</p>
                <h3 className="text-2xl font-bold text-slate-400">325</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="watchlist" className="mt-10">
          <TabsList className="bg-white/5">

            <TabsTrigger value="watchlist" className="text-white">Watchlist</TabsTrigger>
            <TabsTrigger value="favorites" className="text-white">Favorites</TabsTrigger>

          </TabsList>

          <TabsContent value="watchlist">
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="border-white/10 bg-white/5">
                  <CardContent className="p-4">
                    <div className="aspect-square  rounded-lg bg-slate-800" />

                    <h3 className="mt-4 font-semibold text-slate-200">Movie Title</h3>

                    <p className="text-sm text-slate-400">Added to Watchlist</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="mt-6 text-slate-300">
              Favorite movies will appear here.
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="mt-6 space-y-4">
              <Card className="border-white/10 bg-white/5">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Interstellar</h3>

                  <p className="mt-2 text-slate-300">
                    One of the greatest sci-fi movies ever made.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
