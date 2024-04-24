import prisma from "@/prisma/Client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.house.findMany();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const data = await prisma.house.create({
    data: {
      id: parseInt(body.id),
      houseName: body.houseName,
      housePrice: parseInt(body.housePrice),
    },
  });
  return NextResponse.json(data, { status: 201 });
}
