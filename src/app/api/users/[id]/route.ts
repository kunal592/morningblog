
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
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
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching user" },
      { status: 500 }
    );
  }
}
