
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CommentSection } from "@/components/blog/comment-section";
import { Heart, Bookmark, Share2 } from "lucide-react";
import { Post, Comment as CommentType } from "@/lib/types";

interface PostWithAuthor extends Post {
  author: {
    name: string | null;
    profileImage: string | null;
  };
  comments: CommentType[];
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<PostWithAuthor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      axios
        .get(`/api/blogs/${slug}`)
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => {
          console.error(err);
          notFound();
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <article className="space-y-8">
        <div className="space-y-4 text-center">
          <div className="flex flex-wrap gap-2 justify-center">
            {post.postTags.map((tag) => (
              <Badge key={tag.id} variant="secondary">
                {tag.tagId}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                {post.author?.profileImage && (
                  <AvatarImage
                    src={post.author.profileImage}
                    alt={post.author.name || ""}
                  />
                )}
                <AvatarFallback>
                  {post.author?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span>{post.author?.name}</span>
            </div>
            <span>•</span>
            <span>
              {new Date(
                post.publishedAt || post.createdAt
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {post.thumbnailUrl && (
          <Image
            src={post.thumbnailUrl}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full rounded-2xl object-cover aspect-video"
            priority
          />
        )}

        <div className="prose dark:prose-invert max-w-none text-lg">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="lg">
              <Heart className="mr-2 h-5 w-5" /> Like
            </Button>
            <Button variant="outline" size="icon">
              <Bookmark className="h-5 w-5" />
            </Button>
          </div>
          <Button variant="outline" size="lg">
            <Share2 className="mr-2 h-5 w-5" /> Share
          </Button>
        </div>

        <Separator />

        <CommentSection postId={post.id} initialComments={post.comments} />
      </article>
    </div>
  );
}
