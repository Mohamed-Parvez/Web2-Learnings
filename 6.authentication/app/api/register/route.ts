import prisma from "@/prisma/Client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedData = schema.safeParse(body);

  if (!parsedData) return null;
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (user) {
    return NextResponse.json("user already exists", { status: 403 });
  }

  const encryptedPassword = await bcrypt.hash(body.password, 10);
  const createdUser = await prisma.user.create({
    data: {
      email: body.email,
      encryptedPassword,
    },
  });
  return NextResponse.json(createdUser, { status: 201 });
}
