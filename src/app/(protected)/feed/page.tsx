"use client"

import { useState } from 'react';
import { Rss } from 'lucide-react';
import { BlogCard } from '@/components/blog-card';
import { mockBlogs } from '@/lib/mock-data';

export default function FeedPage() {
  // Mock logic: assume user follows some authors
  const [followsAuthors, setFollowsAuthors] = useState(true); 
  const feedBlogs = followsAuthors ? mockBlogs.slice(0, 3) : [];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Your Feed</h1>
      {feedBlogs.length > 0 ? (
        <div className="space-y-8">
          {feedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} view="list" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-muted/50 p-12 text-center">
          <Rss className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold">Your feed is empty</h3>
          <p className="mt-2 text-muted-foreground">
            You need to follow authors first to get a custom feed.
          </p>
        </div>
      )}
    </div>
  );
}
