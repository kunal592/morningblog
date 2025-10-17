"use client";

import { useState } from 'react';
import { BrainCircuit } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MdEditor } from '@/components/md-editor';
import { useToast } from '@/hooks/use-toast';

export default function PostBlogPage() {
  const [content, setContent] = useState('');
  const { toast } = useToast();

  const handlePublish = () => {
    toast({
      title: 'Blog Published!',
      description: 'Your new blog post is now live.',
    });
  };

  const handleSaveDraft = () => {
    toast({
      title: 'Draft Saved',
      description: 'Your blog post has been saved as a draft.',
    });
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
          <Button variant="secondary" onClick={handleSaveDraft}>Save Draft</Button>
          <Button onClick={handlePublish}>Publish</Button>
        </div>
      </div>
      <Input
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
