"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Bookmark,
  Heart,
  Share2,
  MessageCircle,
  BrainCircuit,
} from "lucide-react"
import { Blog, getImageById } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "./ui/dialog"

interface BlogCardProps {
  blog: Blog
  view?: "grid" | "list"
}

export function BlogCard({ blog, view = "grid" }: BlogCardProps) {
  const { toast } = useToast()
  const coverImage = getImageById(blog.imageId)
  const authorAvatar = getImageById(blog.author.avatarId)

  const handleFollow = () => {
    toast({
      title: "Author Followed",
      description: `You are now following ${blog.author.name}.`,
    })
  }
  
  const handleLike = () => {
    toast({
      title: "Post Liked",
      description: `You liked "${blog.title}".`,
    })
  }
  
  const handleBookmark = () => {
    toast({
      title: "Post Bookmarked",
      description: `"${blog.title}" has been added to your bookmarks.`,
    })
  }

  const cardContent = (
    <>
      <CardHeader className="p-0">
        <Link href={`/blog/${blog.slug}`} className="block">
          {coverImage && (
            <Image
              src={coverImage.imageUrl}
              alt={coverImage.description}
              width={view === "grid" ? 600 : 250}
              height={view === "grid" ? 400 : 150}
              className={cn("w-full rounded-t-2xl object-cover", view === 'grid' ? 'aspect-[3/2]' : 'aspect-[16/9]')}
              data-ai-hint={coverImage.imageHint}
            />
          )}
        </Link>
      </CardHeader>
      <CardContent className={cn("flex flex-col flex-grow", view === "grid" ? "p-6" : "p-0 pl-6")}>
        <div className="mb-4 flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <Link href={`/blog/${blog.slug}`} className="group">
          <h2 className="mb-2 text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
            {blog.title}
          </h2>
          <p className="text-muted-foreground line-clamp-3">
            {blog.content}
          </p>
        </Link>
        <div className="flex-grow" />
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              {authorAvatar && <AvatarImage src={authorAvatar.imageUrl} alt={blog.author.name} />}
              <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{blog.author.name}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={handleFollow}>
            Follow
          </Button>
        </div>
      </CardContent>
    </>
  )

  return (
    <Card className={cn(
        "flex flex-col rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300",
        view === "list" && "flex-row"
    )}>
      {view === "grid" ? (
        <>
            {cardContent}
            <CardFooter className="flex justify-between p-6 pt-0">
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={handleLike}><Heart className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon"><Link href={`/blog/${blog.slug}#comments`}><MessageCircle className="h-5 w-5" /></Link></Button>
                    <Button variant="ghost" size="icon" onClick={handleBookmark}><Bookmark className="h-5 w-5" /></Button>
                </div>
                <div className="flex gap-1">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon"><BrainCircuit className="h-5 w-5 text-primary" /></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>AI Summary</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                                This is an AI-generated summary of the blog post: "{blog.title}". The summary highlights the key points and takeaways from the article.
                            </DialogDescription>
                            <p className="text-sm text-muted-foreground pt-2">
                                {blog.content.substring(0, 200)}...
                            </p>
                        </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="icon"><Share2 className="h-5 w-5" /></Button>
                </div>
            </CardFooter>
        </>
      ) : (
        <>
            <div className="w-1/3">{cardContent}</div>
        </>
      )}
    </Card>
  )
}
