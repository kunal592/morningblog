
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from "@/lib/types";
import axios from "axios";

interface CommentSectionProps {
  postId: string;
  initialComments: Comment[];
}

export function CommentSection({ postId, initialComments }: CommentSectionProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios.get(`/api/blogs/${postId}/comments`).then((res) => {
      setComments(res.data);
    });
  }, [postId]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const res = await axios.post(`/api/comments`, { 
      content: newComment,
      postId 
    });
    setComments([res.data, ...comments]);
    setNewComment("");
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
