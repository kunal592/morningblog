
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const blogs = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
  });
  return NextResponse.json(blogs);
}
