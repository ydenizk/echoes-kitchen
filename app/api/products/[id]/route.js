import { prisma } from "@/utils/prismaDb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

// DELETE SINGLE PRODUCT
export const DELETE = async (req, { params }) => {
  const session = await getServerSession(authOptions);

  const { id } = params;

  if (session?.user.isAdmin) {
    try {
      await prisma.product.delete({
        where: {
          id: id,
        },
        include:{category:true}
      });

      return NextResponse.json({ message: "product deleted successfully..." });
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "An error occurred." },
        { status: 500 }
      );
    }
  }
  return (
    NextResponse.json({ message: "You are not allowed!" }),
    {
      status: 403,
    }
  );
};

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);

  const { id } = params;

  const { title, desc, price, imageUrl, publicId, categoryId, options } =
    await req.json();

  if (session?.user?.isAdmin) {
    try {
      const product = await prisma.product.update({
        where: { id: id },
        include: { options: true, category: true },

        data: {
          title,
          desc,
          price,
          imageUrl,
          publicId,
          categoryId,
          options: {
            updateMany: options.map(option => ({
              where: { id: option.id },
              data: { size: option.size, price: option.price }
            }))
          }
        },
      });

      return NextResponse.json(product);
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "sth went wrong for EDiting.." },
        { status: 500 }
      );
    }
  }
}


export async function GET(req, { params }) {
  try {
    const id = params.id;
    const product = await prisma.product.findUnique({
      where: { id },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "sth went wrong for product.." }
    );
  }
}

