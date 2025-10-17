import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: params.slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profileImage: true,
          },
        },
        postTags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const formattedPost = {
      ...post,
      tags: post.postTags.map((pt) => pt.tag),
    };

    return NextResponse.json(formattedPost);
  } catch (error) {
    console.error(`Error fetching post with slug ${params.slug}:`, error);
    return NextResponse.json({ error: "Error fetching post" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: { slug: params.slug },
    });

    if (!post || post.authorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updatedPost = await prisma.post.update({
      where: { id: post.id },
      data: { title, content },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error(`Error updating post with slug ${params.slug}:`, error);
    return NextResponse.json({ error: "Error updating post" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { slug: params.slug },
    });

    if (!post || post.authorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.post.delete({
      where: { id: post.id },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(`Error deleting post with slug ${params.slug}:`, error);
    return NextResponse.json({ error: "Error deleting post" }, { status: 500 });
  }
}
