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

export async function DELETE(request: NextResponse) {
  const body = await request.json();
  const deletedata = await prisma.house.delete({
    where: {
      id: body.id,
      houseName: body.houseName,
      housePrice: body.housePrice,
    },
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const updatedata = await prisma.house.update({
    where: {
      id: parseInt(body.id),
    },
    data: {
      id: parseInt(body.id),
      houseName: body.houseName,
      housePrice: parseInt(body.housePrice),
    },
  });
  return NextResponse.json(updatedata, { status: 201 });
}
