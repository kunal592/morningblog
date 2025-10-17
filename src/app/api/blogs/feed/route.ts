
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// This is a placeholder for session management. In a real application, you would get the current user's ID from the session.
const getCurrentUserId = async () => {
  // For now, let's assume the user ID is known. Replace with actual session logic.
  const user = await prisma.user.findFirst();
  return user?.id;
};

export async function GET() {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const followedAuthors = await prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });

    const followedAuthorIds = followedAuthors.map((follow) => follow.followingId);

    const feed = await prisma.post.findMany({
      where: {
        authorId: {
          in: followedAuthorIds,
        },
        isPublished: true,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(feed);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching feed" },
      { status: 500 }
    );
  }
}
