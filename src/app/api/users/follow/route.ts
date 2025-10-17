
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
    const { userIdToFollow } = await req.json();
    const currentUser = session.user.id;

    await prisma.follows.create({
      data: {
        followerId: currentUser,
        followingId: userIdToFollow,
      },
    });

    return NextResponse.json({ message: "Successfully followed user" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error following user" },
      { status: 500 }
    );
  }
}
