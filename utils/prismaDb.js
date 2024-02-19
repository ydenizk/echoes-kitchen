import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient();
  };
  
  const globalForPrisma = globalThis || global;
  //export const prisma = globalForPrisma.prisma || prismaClientSingleton();
  const prismaBase = globalForPrisma.prisma || prismaClientSingleton();
  export const prisma = prismaBase.$extends({
    query: {
      cart: {
        async update({ args, query }) {
          args.data = { ...args.data, updatedAt: new Date() };
          return query(args);
        },
      },
    },
  });
  
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaBase;
  