
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const blogs = await prisma.post.findMany({
    where: {
      status: "DRAFT",
      author: {
        email: session?.user?.email ?? "",
      },
    },
  });
  return NextResponse.json(blogs);
}
