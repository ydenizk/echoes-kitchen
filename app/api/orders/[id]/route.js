import { prisma } from "@/utils/prismaDb";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  const { id } = params;

  try {
    const body = await req.json();

    const order = await prisma.order.update({
      where: {
        id: id,
      },
      include: { user: true },

      data: { status: body },
    });
    return NextResponse.json(order);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
};
