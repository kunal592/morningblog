'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Post } from '@/lib/types';
import { BlogCard } from '@/components/blog/blog-card';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { cn } from '@/lib/utils';

export default function SearchPageContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  const [blogs, setBlogs] = useState<Post[]>([]);
  const [view, setView] = useLocalStorage<"grid" | "list">("search-view", "grid");

  useEffect(() => {
    if (q) {
      axios.get(`/api/blogs/search?q=${q}`).then((res) => {
        setBlogs(res.data);
      });
    }
  }, [q]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Search Results for "{q}"</h1>
      </div>
      <div
        className={cn(
          'transition-all duration-300',
          view === 'grid'
            ? 'grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'
            : 'space-y-8'
        )}
      >
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} view={view} />
        ))}
      </div>
    </div>
  );
}
