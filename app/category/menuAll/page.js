import React from "react";
import { prisma } from "@/utils/prismaDb";
import ProductCard from "@/components/productCard";
import CartBox from "@/components/cartBox";
import { Prisma } from "@prisma/client";

const getData = async () => {
  const res = await fetch(`${process.env.PUBLIC_URL}/api/category`, {
    cache: "no-store",
  });

  if (res.ok) {
    const categories = await res.json();

    return categories;
  }
};

const MenuAll = async () => {
  const categories = await getData();

  return (
    <div className="w-full py-20 bg-bgcolor">
      <h1
        className="text-3xl p-4  mx-auto text-center w-1/2   whitespace-nowrap mb-10
      mmd:text-2xl min-w-fit bg-neutral-300 text-neutral-700"
      >
        WHOLE MENU
      </h1>

      <div className="w-full flex ">
        <div className="flex-2 gap-4 px-4">
          {categories.map((category) => {
            return (
              <div
                className="w-full  text-left my-4 py-4 border-b border-neutral-400 "
                key={category.id}
              >
                <h1
                  className="text-2xl p-3     
              bg-orange-950  capitalize font-bold tracking-wider whitespace-nowrap
               text-slate-200 mmd:text-2xl min-w-fit mb-8 max-w-fit px-8"
                >
                  {category.tit}
                </h1>
                <div
                  className=" w-full   gap-4  grid grid-cols-2 text-slate-300 
              font-extralight mmd:grid-cols-1"
                >
                  {category?.products?.map((product) => {
                    return <ProductCard product={product} key={product.id} />;
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="  flex-1  bg-blackk text-center h-auto max-w-xs text-white ">
          <CartBox />
        </div>
      </div>
    </div>
  );
};

export default MenuAll;
