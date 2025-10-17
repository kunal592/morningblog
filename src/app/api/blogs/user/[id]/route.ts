
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const blogs = await prisma.post.findMany({
    where: { authorId: id },
  });
  return NextResponse.json(blogs);
}
