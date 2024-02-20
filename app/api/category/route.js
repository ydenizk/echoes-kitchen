import { prisma } from "@/utils/prismaDb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async (req) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
      include: { products: true },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.log(error);
    return NextResponse.json("sth went wrong about categories ...", {
      status: 500,
    });
  }
};
