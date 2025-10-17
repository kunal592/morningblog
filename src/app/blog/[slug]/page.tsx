import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getBlogBySlug, getImageById } from '@/lib/mock-data';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CommentSection } from '@/components/comment-section';
import { Heart, Bookmark, Share2 } from 'lucide-react';


export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  const coverImage = getImageById(blog.imageId);
  const authorAvatar = getImageById(blog.author.avatarId);

  return (
    <div className="max-w-4xl mx-auto">
      <article className="space-y-8">
        <div className="space-y-4 text-center">
            <div className="flex flex-wrap gap-2 justify-center">
            {blog.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                {tag}
                </Badge>
            ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">{blog.title}</h1>
            <div className="flex items-center justify-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        {authorAvatar && <AvatarImage src={authorAvatar.imageUrl} alt={blog.author.name} />}
                        <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{blog.author.name}</span>
                </div>
                <span>•</span>
                <span>{new Date(blog.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric"})}</span>
            </div>
        </div>
        
        {coverImage && (
          <Image
            src={coverImage.imageUrl}
            alt={coverImage.description}
            width={1200}
            height={600}
            className="w-full rounded-2xl object-cover aspect-video"
            data-ai-hint={coverImage.imageHint}
            priority
          />
        )}
        
        <div className="prose dark:prose-invert max-w-none text-lg">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
        </div>

        <Separator />
        
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Button variant="outline" size="lg">
                    <Heart className="mr-2 h-5 w-5"/> Like
                </Button>
                <Button variant="outline" size="icon">
                    <Bookmark className="h-5 w-5"/>
                </Button>
            </div>
             <Button variant="outline" size="lg">
                <Share2 className="mr-2 h-5 w-5"/> Share
            </Button>
        </div>

        <Separator />

        <CommentSection comments={blog.comments} />

      </article>
    </div>
  );
}
