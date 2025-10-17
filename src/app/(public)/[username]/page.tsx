'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Post, User } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BlogCard } from '@/components/blog/blog-card';

export default function UserProfilePage() {
  const params = useParams();
  const { username } = params;
  const [user, setUser] = useState<User | null>(null);
  const [blogs, setBlogs] = useState<Post[]>([]);

  useEffect(() => {
    if (username) {
      axios.get(`/api/users/${username}`).then((res) => {
        setUser(res.data.user);
        setBlogs(res.data.posts);
      });
    }
  }, [username]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col items-center space-y-4 mb-12">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.image} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-muted-foreground">@{user.username}</p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} view="grid" />
        ))}
      </div>
    </div>
  );
}
