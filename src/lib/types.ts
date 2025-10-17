
export interface User {
  id: string;
  name: string | null;
  email?: string | null;
  profileImage: string | null;
  followers?: { id: string }[];
}

export interface Tag {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  publishedAt: Date | string | null;
  author: User | null;
  tags: Tag[];
  postTags: { tagId: string }[];
  thumbnailUrl: string | null;
  likesCount: number;
  commentsCount: number;
  authorId: string | null;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date | string;
  author: User;
}
