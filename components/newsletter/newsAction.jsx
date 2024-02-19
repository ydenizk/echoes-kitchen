"use server";

import { prisma } from "@/utils/prismaDb";
import { revalidatePath } from "next/cache";

export const handleNews = async (formData) => {
  const email = formData.get("email");

  await prisma.newsletter.create({
    data: {
      email,
    },
  });
};
