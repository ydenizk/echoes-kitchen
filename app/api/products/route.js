import { prisma } from "@/utils/prismaDb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (req) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.isAdmin) {
    return NextResponse.json(
      { message: "Unauthorized access..." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { title, desc, price, catTitle, options, imageUrl, publicId } = body;
    const product = await prisma.product.create({
      //data: body,
      data: {
        title,
        desc,
        price,
        catTitle,
        imageUrl,
        publicId,
        options: {
          create: options,
        },
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "An error occurred." },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.isAdmin) {
    return NextResponse.json(
      { message: "Unauthorized access..." },
      { status: 401 }
    );
  }
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include:{options:true}
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json("sth went wrong about products ...", {
      status: 500,
    });
  }
};
