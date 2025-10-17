
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const posts = await prisma.post.findMany({
      where: { isPublished: true },
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

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = session.user.id;
    const { title, content, isPublished, thumbnailUrl, slug, tags } = await req.json();

    const post = await prisma.post.create({
      data: {
        title,
        content,
        isPublished,
        thumbnailUrl,
        slug,
        authorId: userId,
        postTags: {
          create: tags.map((tag: string) => ({ tagId: tag })),
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating post" },
      { status: 500 }
    );
  }
}
