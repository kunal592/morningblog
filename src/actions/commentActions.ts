
"use server";

import { revalidatePath } from "next/cache";
import { Comment } from "@/lib/types";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export const getComments = async (args: Prisma.CommentFindManyArgs) => {
  const comments = await prisma.comment.findMany(args);
  return comments as Comment[];
};

export const createComment = async (data: Prisma.CommentCreateInput) => {
  const comment = await prisma.comment.create({ data });
  revalidatePath(`/blog/${data.post?.connect?.slug}`);
  return comment as Comment;
};

export const deleteComment = async (id: string, slug: string) => {
  await prisma.comment.delete({ where: { id } });
  revalidatePath(`/blog/${slug}`);
};
