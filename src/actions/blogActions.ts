
"use server";

import { revalidatePath } from "next/cache";
import { Post } from "@/lib/types";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export const getBlogs = async (args: Prisma.PostFindManyArgs) => {
  const posts = await prisma.post.findMany(args);
  return posts as Post[];
};

export const getBlog = async (slug: string) => {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: true,
      tags: true,
    },
  });
  return post as Post;
};

export const createBlog = async (data: Prisma.PostCreateInput) => {
  const post = await prisma.post.create({ data });
  revalidatePath("/dashboard");
  return post as Post;
};

export const updateBlog = async (slug: string, data: Prisma.PostUpdateInput) => {
  const post = await prisma.post.update({ where: { slug }, data });
  revalidatePath(`/dashboard`);
  return post as Post;
};

export const deleteBlog = async (slug: string) => {
  await prisma.post.delete({ where: { slug } });
  revalidatePath("/dashboard");
};
