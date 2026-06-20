
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getMovieDetails } from "@/app/services/endpoints"


type Props = {
  params: Promise<{ id: string }>
}

export default async function DataMoviesPage({params }: Props) {

  const {id}=await params

  const movie = await getMovieDetails(id)

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/9.jpg"


  return (
    <div>
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
        <Image
          src={imageUrl}
          alt={movie.title}
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
          height={600}
          width={400}
        />
        <CardHeader>
          <CardAction>
            <Badge variant="secondary">Featured</Badge>
          </CardAction>
          <CardTitle>{movie.title}</CardTitle>
          <CardDescription>A good Movie</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full"> </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
