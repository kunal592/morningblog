
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { title, content, isPublished } = await request.json();

  const updatedBlog = await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      status: isPublished ? "PUBLISHED" : "DRAFT",
    },
  });

  return NextResponse.json(updatedBlog);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ message: "Blog deleted" });
}
