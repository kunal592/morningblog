
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Post, Comment as CommentType } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "lucide-react";
import { CommentSection } from "@/components/blog/comment-section";

interface BlogDetailProps {
  blog: Post;
  initialComments: CommentType[];
}

export function BlogDetail({ blog, initialComments }: BlogDetailProps) {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto py-12">
      <article className="prose lg:prose-xl dark:prose-invert mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {blog.title}
        </h1>
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={blog.author?.profileImage || ''} />
              <AvatarFallback>{blog.author?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{blog.author?.name}</p>
              <p className="text-sm text-muted-foreground">@{blog.author?.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span className="text-sm text-muted-foreground">
              {new Date(blog.publishedAt as string).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </article>
      <div className="mt-12">
        <CommentSection postId={blog.id} initialComments={initialComments} />
      </div>
    </div>
  );
}
