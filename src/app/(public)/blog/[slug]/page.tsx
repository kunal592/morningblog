'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Post } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, MessageCircle } from 'lucide-react';

export default function BlogDetailPage() {
  const params = useParams();
  const { slug } = params;
  const [blog, setBlog] = useState<Post | null>(null);

  useEffect(() => {
    if (slug) {
      axios.get(`/api/blogs/${slug}`).then((res) => {
        setBlog(res.data);
      });
    }
  }, [slug]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <article className="prose lg:prose-xl dark:prose-invert mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {blog.title}
        </h1>
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={blog.author.image} />
              <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{blog.author.name}</p>
              <p className="text-sm text-muted-foreground">@{blog.author.username}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span className="text-sm text-muted-foreground">
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </article>
    </div>
  );
}
