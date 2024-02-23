import { prisma } from "@/utils/prismaDb";
import { NextResponse } from "next/server";


export const GET = async (req,res) => {
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
    