
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          posts: {
            where: { isPublished: true },
            orderBy: { createdAt: "desc" },
            include: {
              author: true,
              postTags: {
                select: {
                  tagId: true,
                },
              },
            },
          },
          followers: true,
          following: true,
        },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json(user);
    } else {
      const users = await prisma.user.findMany({
        include: {
          posts: {
            where: { isPublished: true },
          },
          followers: true,
          following: true,
        },
      });
      return NextResponse.json(users);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
}
