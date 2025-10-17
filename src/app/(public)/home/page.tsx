"use client"

import { useState, useEffect } from "react"
import { BlogCard } from "@/components/blog/blog-card"
import { GridListToggle } from "@/components/layout/grid-list-toggle"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { cn } from "@/lib/utils"
import { Post } from "@/lib/types"
import axios from "axios"

export default function HomePage() {
  const [view, setView] = useLocalStorage<"grid" | "list">("home-view", "grid")
  const [blogs, setBlogs] = useState<Post[]>([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

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
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} view={view} />
        ))}
      </div>
    </div>
  )
}
