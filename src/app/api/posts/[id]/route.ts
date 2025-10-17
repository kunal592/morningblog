
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: params.id,
      },
      include: {
        author: true,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching post" },
      { status: 500 }
    );
  }
}
