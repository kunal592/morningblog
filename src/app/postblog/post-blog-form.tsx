
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MdEditor } from "@/components/blog/md-editor";
import { useToast } from "@/hooks/use-toast";
import { Post } from "@/lib/types";
import { createBlog, updateBlog } from "@/actions/blogActions";

interface PostBlogFormProps {
  post?: Post;
}

export function PostBlogForm({ post: initialPost }: PostBlogFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState<Partial<Post>>(initialPost || {});
  const [tags, setTags] = useState<string>(
    initialPost?.tags?.map((t) => t.name).join(", ") || ""
  );
  const { toast } = useToast();

  const handleSave = async (isPublished: boolean) => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to create a post.",
        variant: "destructive",
      });
      return;
    }

    const postData = {
      ...post,
      authorId: session.user.id,
      publishedAt: isPublished ? new Date() : null,
      tags: {
        connectOrCreate: tags.split(",").map((tag) => ({
          where: { name: tag.trim() },
          create: { name: tag.trim() },
        })),
      },
    };

    try {
      let savedPost;
      if (initialPost?.id) {
        savedPost = await updateBlog(initialPost.slug, postData);
      } else {
        savedPost = await createBlog(postData);
      }
      toast({
        title: isPublished ? "Blog Published!" : "Draft Saved",
        description: isPublished
          ? "Your new blog post is now live."
          : "Your blog post has been saved as a draft.",
      });
      router.push(`/blog/${savedPost.slug}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Create a New Post</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <BrainCircuit className="mr-2 h-4 w-4" />
            AI SEO Optimization
          </Button>
          <Button variant="secondary" onClick={() => handleSave(false)}>
            Save Draft
          </Button>
          <Button onClick={() => handleSave(true)}>Publish</Button>
        </div>
      </div>
      <Input
        value={post.title || ""}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        placeholder="Enter your blog title here..."
        className="h-12 border-0 px-2 text-2xl font-bold shadow-none focus-visible:ring-0"
      />
      <Input
        value={post.slug || ""}
        onChange={(e) => setPost({ ...post, slug: e.target.value })}
        placeholder="Enter your blog slug here..."
        className="h-12 border-0 px-2 text-lg shadow-none focus-visible:ring-0"
      />
      <Input
        value={post.thumbnailUrl || ""}
        onChange={(e) => setPost({ ...post, thumbnailUrl: e.target.value })}
        placeholder="Enter your blog thumbnail URL here..."
        className="h-12 border-0 px-2 text-lg shadow-none focus-visible:ring-0"
      />
      <Input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Enter tags, separated by commas..."
        className="h-12 border-0 px-2 text-lg shadow-none focus-visible:ring-0"
      />
      <Separator />
      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
        <MdEditor
          content={post.content || ""}
          setContent={(value) => setPost({ ...post, content: value })}
        />
      </div>
    </div>
  );
}
