
"use server";

import { revalidatePath } from "next/cache";
import { User } from "@/lib/types";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export const getUsers = async (args: Prisma.UserFindManyArgs) => {
  const users = await prisma.user.findMany(args);
  return users as User[];
};

export const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      followers: true,
    },
  });
  return user as User;
};

export const updateUser = async (id: string, data: Prisma.UserUpdateInput) => {
  const user = await prisma.user.update({ where: { id }, data });
  revalidatePath(`/profile/${id}`);
  return user as User;
};

export const deleteUser = async (id: string) => {
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin");
};

export const followUser = async (userId: string, followerId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      followers: {
        connect: {
          id: followerId,
        },
      },
    },
  });
  revalidatePath(`/profile/${userId}`);
};

export const unfollowUser = async (userId: string, followerId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      followers: {
        disconnect: {
          id: followerId,
        },
      },
    },
  });
  revalidatePath(`/profile/${userId}`);
};
