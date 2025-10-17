"use client";

import { useState, useEffect } from 'react';
import { BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MdEditor } from '@/components/blog/md-editor';
import { useToast } from '@/hooks/use-toast';
import { Post } from '@/lib/types';

export default function EditBlogPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${params.slug}`);
        if (res.ok) {
          const postData = await res.json();
          setPost(postData);
          setTitle(postData.title);
          setContent(postData.content);
        } else {
          console.error('Error fetching post:', await res.text());
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [params.slug]);

  const handleUpdate = async () => {
    if (!post) return;

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        toast({
          title: 'Blog Updated!',
          description: 'Your blog post has been updated.',
        });
      } else {
        const errorData = await response.json();
        toast({
          title: 'Error Updating Blog',
          description: errorData.error || 'An unknown error occurred.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error Updating Blog',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!post) return;

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Blog Deleted!',
          description: 'Your blog post has been deleted.',
        });
        // Redirect to feed or another appropriate page
        window.location.href = '/feed';
      } else {
        const errorData = await response.json();
        toast({
          title: 'Error Deleting Blog',
          description: errorData.error || 'An unknown error occurred.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error Deleting Blog',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
        <div className="flex items-center gap-2">
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </div>
      </div>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter your blog title here..."
        className="h-12 border-0 px-2 text-2xl font-bold shadow-none focus-visible:ring-0"
      />
      <Separator />
      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
        <MdEditor content={content} setContent={setContent} />
      </div>
    </div>
  );
}
