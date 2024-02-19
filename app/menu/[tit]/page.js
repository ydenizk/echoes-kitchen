import React from "react";

import { prisma } from "@/utils/prismaDb";
import CartBox from "@/components/cartBox";
import ProductCard from "@/components/productCard";

const CategoryPage = async ({ params: { tit } }) => {
  const category = await prisma.category.findUnique({
    where: { tit },
    include: { products: true },
  });

  return (
    <div className="w-full my-10 mx-auto">
      <h1
        className="text-3xl p-4  mx-auto text-center w-1/3  border-2 
 border-blackk bg-blackk  capitalize font-bold tracking-wider whitespace-nowrap text-slate-200 mmd:text-2xl min-w-fit mb-16"
      >
        {category.tit}
      </h1>

      <div className="w-full flex  sm:flex-col-reverse  sm:gap-2   overflow-hidden ">
        <div className="flex-2   gap-4  ">
          <div
            className="    gap-4  grid grid-cols-2 text-slate-300 px-4
       font-extralight mmd:grid-cols-1"
          >
            {category?.products.map((product) => {
              return <ProductCard product={product} />;
            })}
          </div>
        </div>

        <div className="  flex-1  bg-blackk text-center h-auto max-w-xs text-white sm:w-auto sm:mx-4 sm:max-w-full sm:rounded-md  ">
          <CartBox />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
