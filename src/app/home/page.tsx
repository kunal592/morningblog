"use client"

import { useState } from "react"
import { BlogCard } from "@/components/blog-card"
import { GridListToggle } from "@/components/grid-list-toggle"
import { mockBlogs } from "@/lib/mock-data"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const [view, setView] = useLocalStorage<"grid" | "list">("home-view", "grid")
  const publishedBlogs = mockBlogs.filter(blog => blog.isPublished);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">All Blogs</h1>
        <GridListToggle view={view} setView={setView} />
      </div>
      <div
        className={cn(
          "transition-all duration-300",
          view === "grid"
            ? "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            : "space-y-8"
        )}
      >
        {publishedBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} view={view} />
        ))}
      </div>
    </div>
  )
}
