"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { type Comment as CommentType, getImageById, mockUsers } from "@/lib/mock-data";

interface CommentSectionProps {
  comments: CommentType[];
}

export function CommentSection({ comments }: CommentSectionProps) {
    const currentUser = mockUsers[0];
    const currentUserAvatar = getImageById(currentUser.avatarId);

  return (
    <section id="comments" className="space-y-8">
      <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
      
      <div className="flex items-start gap-4">
        <Avatar>
          {currentUserAvatar && <AvatarImage src={currentUserAvatar.imageUrl} alt={currentUser.name} />}
          <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="w-full space-y-2">
            <Textarea placeholder="Add a comment..." />
            <div className="flex justify-end">
                <Button>Post Comment</Button>
            </div>
        </div>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => {
            const authorAvatar = getImageById(comment.author.avatarId);
            return (
                <div key={comment.id} className="flex items-start gap-4">
                    <Avatar>
                        {authorAvatar && <AvatarImage src={authorAvatar.imageUrl} alt={comment.author.name} />}
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <p className="font-semibold">{comment.author.name}</p>
                            <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                        </div>
                        <p className="mt-1 text-muted-foreground">{comment.content}</p>
                    </div>
                </div>
            )
        })}
      </div>
    </section>
  );
}
