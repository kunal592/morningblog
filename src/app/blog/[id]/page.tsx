
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${id}`);
      const data = await res.json();
      setPost(data);
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-4">by {post.author.name}</p>
      <div className="prose lg:prose-xl">{post.content}</div>
    </div>
  );
};

export default BlogPost;
