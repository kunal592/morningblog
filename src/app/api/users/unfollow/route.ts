
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
    const { userIdToUnfollow } = await req.json();
    const currentUser = session.user.id;

    await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: currentUser,
          followingId: userIdToUnfollow,
        },
      },
    });

    return NextResponse.json({ message: "Successfully unfollowed user" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error unfollowing user" },
      { status: 500 }
    );
  }
}
