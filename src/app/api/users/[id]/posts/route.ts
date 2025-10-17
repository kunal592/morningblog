
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const posts = await prisma.post.findMany({
      where: { authorId: params.id },
      include: {
        author: true,
        postTags: {
          select: {
            tagId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const transformedPosts = posts.map((post) => ({
      ...post,
      tags: post.postTags.map((pt) => pt.tagId),
    }));

    return NextResponse.json(transformedPosts);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching posts" },
      { status: 500 }
    );
  }
}
