import { prisma } from "@/utils/prismaDb";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

//get orders
export const GET = async (req) => {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      if (session.user.isAdmin) {
        const orders = await prisma.order.findMany();
        return NextResponse.json(orders);
      }
      const orders = await prisma.order.findMany({
        where: {
          userEmail: session.user.email,
        },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(orders);
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "An error occurred." },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "You are not authenticated..Please login.." },
      { status: 401 }
    );
  }
};

//create new order

export const POST = async (req) => {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const body = await req.json();
      const order = await prisma.order.create({
        data: body,
      });
      return NextResponse.json(order);
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "An error occurred." },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "You are not authenticated..Please login.." },
      { status: 401 }
    );
  }
};
