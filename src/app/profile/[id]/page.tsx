
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/blog-card";
import { Post, User } from "@/lib/types";

interface UserProfile extends User {
  posts: Post[];
  followers: { id: string }[];
  following: { id: string }[];
}

export default function ProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const { data: session } = useSession();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        });
    }
  }, [id]);

  useEffect(() => {
    if (session?.user?.id && user) {
      setIsFollowing(
        user.followers.some((follower) => follower.id === session.user?.id)
      );
    }
  }, [session, user]);

  const handleFollow = async () => {
    if (!session || !user) return;

    const endpoint = isFollowing ? "unfollow" : "follow";
    await fetch(`/api/users/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userIdToFollow: user.id, userIdToUnfollow: user.id }),
    });
    setIsFollowing(!isFollowing);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-8">
        <Avatar className="h-32 w-32">
          <AvatarImage src={user.profileImage || ""} />
          <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <div className="flex gap-4 text-muted-foreground">
            <span>{user.posts.length} Posts</span>
            <span>{user.followers.length} Followers</span>
            <span>{user.following.length} Following</span>
          </div>
          {session?.user?.id !== user.id && (
            <Button onClick={handleFollow}>
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {user.posts.map((post) => (
          <BlogCard key={post.id} blog={post} view="grid" />
        ))}
      </div>
    </div>
  );
}
