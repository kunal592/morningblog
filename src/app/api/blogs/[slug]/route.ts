
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        slug: params.slug,
      },
      include: {
        author: true,
        comments: {
          include: {
            author: true,
          },
        },
        postTags: {
          select: {
            tagId: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: params.slug },
    });

    if (!post || post.authorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { title, content, isPublished, thumbnailUrl, slug, tags } = await req.json();

    const updatedPost = await prisma.post.update({
      where: {
        id: params.slug,
      },
      data: {
        title,
        content,
        isPublished,
        thumbnailUrl,
        slug,
        postTags: {
          deleteMany: {},
          create: tags.map((tag: string) => ({ tagId: tag })),
        },
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: params.slug },
    });

    if (!post || post.authorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.post.delete({
      where: {
        id: params.slug,
      },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting post" },
      { status: 500 }
    );
  }
}
