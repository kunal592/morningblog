
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = session.user.id;
    const { content, postId } = await req.json();

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: userId,
        postId: postId,
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating comment" },
      { status: 500 }
    );
  }
}
