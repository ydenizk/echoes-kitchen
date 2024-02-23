"use server";

import { prisma } from "@/utils/prismaDb";
import { revalidatePath } from "next/cache";

export const handleContact = async (formData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");


//bunu trycatch leyip,error handling i burda yapabilirsin

  await prisma.contact.create({
    data: {
      name,
      email,
      message,
    },
  });

  //revalidatePath("/products")
};
