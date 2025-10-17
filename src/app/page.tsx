
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Latest Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded-md">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="text-gray-600">by {post.author.name}</p>
            <p className="mt-2">{post.content}</p>
            <Link href={`/blog/${post.id}`} className="text-blue-500 hover:underline mt-4 inline-block">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
