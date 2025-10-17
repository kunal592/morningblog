
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const blogs = await prisma.post.findMany({
    where: { authorId: userId },
  });
  return NextResponse.json(blogs);
}
