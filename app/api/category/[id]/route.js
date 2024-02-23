import { prisma } from "@/utils/prismaDb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const id = params.id;
    const category = await prisma.category.findUnique({
      where: { id },
      include: { products: true},
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "sth went wrong for category.." });
  }
}
