
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from "@/lib/types";
import { createComment } from "@/actions/commentActions";
import { useToast } from "@/hooks/use-toast";

interface CommentSectionProps {
  postId: string;
  initialComments: Comment[];
}

export function CommentSection({ postId, initialComments }: CommentSectionProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const handleCommentSubmit = async () => {
    if (!newComment.trim() || !session?.user?.id) return;

    try {
      const comment = await createComment({
        content: newComment,
        post: {
          connect: {
            id: postId,
          },
        },
        author: {
          connect: {
            id: session.user.id,
          },
        },
      });
      setComments([comment, ...comments]);
      setNewComment("");
      toast({
        title: "Comment Posted!",
        description: "Your comment has been successfully posted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Comments</h2>
      {session && (
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={session.user?.image || ""} />
            <AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="w-full space-y-2">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <Button onClick={handleCommentSubmit}>Post Comment</Button>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src={comment.author.profileImage || ""} />
              <AvatarFallback>{comment.author.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="font-semibold">{comment.author.name}</p>
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
