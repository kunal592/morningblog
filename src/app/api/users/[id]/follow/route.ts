
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? "" },
  });

  await prisma.user.update({
    where: { id: user?.id },
    data: {
      following: {
        connect: { id },
      },
    },
  });

  return NextResponse.json({ message: "User followed" });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? "" },
  });

  await prisma.user.update({
    where: { id: user?.id },
    data: {
      following: {
        disconnect: { id },
      },
    },
  });

  return NextResponse.json({ message: "User unfollowed" });
}
