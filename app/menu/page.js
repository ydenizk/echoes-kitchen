import React from "react";
import Link from "next/link";
import { prisma } from "@/utils/prismaDb";
import CartBox from "@/components/cartBox";

async function MenuPage() {
  const categories = await prisma.category.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div className="w-full my-10">
      <h1 className="text-3xl p-4  mx-auto text-center w-1/2  border-2 whitespace-nowrap
       border-blackk mmd:text-2xl min-w-fit">
        Check out Our Categories
      </h1>

      <div className="w-full  flex sm:flex-col-reverse sm:items-center sm:gap-2 my-16 mx-auto sm:px-4 overflow-hidden ">
        <div className=" w-full flex-2 p-10 mx-4  rounded-md bg-resbanner  object-cover ">
          <div className=" w-full  flex flex-col items-left   gap-6 pl-8">
            {categories.map((cat) => {
              return (
                <Link
                  href={`/menu/${cat.tit}`}
                  key={cat.id}
                  className=" text-slate-300 w-[50%]  transition duration-500 hover:bg-orange-900 tracking-wider 
                 uppercase bg-blackk text-xl py-5 rounded-md text-left px-12 whitespace-nowrap min-w-fit"
                >
                  {cat.tit}
                </Link>
              );
            })}
            <div className="w-full text-center mt-12">
              <Link
                href="/menu/menuAll"
                className=" text-slate-300 w-[50%]  transition duration-500  hover:bg-orange-900 tracking-wider 
                 uppercase bg-orange-950 text-xl py-5 rounded-md text-left px-12 whitespace-nowrap min-w-fit mx-auto "
              >
                whole menu
              </Link>
            </div>
          </div>
        </div>
        <div className="  flex-1  bg-blackk text-center h-auto max-w-xs sm:w-full  sm:max-w-full text-white  sm:rounded-md">
          <CartBox />
        </div>
      </div>
    </div>
  );
}

export default MenuPage;