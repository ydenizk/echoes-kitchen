import React from "react";
import Image from "next/image";
import { prisma } from "@/utils/prismaDb";
import CartBox from "@/components/cartBox";
import Price from "@/components/price";
//import DeleteBtn from "@/components/deleteBtn";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UpdateButton from "@/components/updateButton";

const getData = async () => {
  const res = await fetch(`${process.env.PUBLIC_URL}/api/category`, {
    cache: "no-store",
  });

  if (res.ok) {
    const categories = await res.json();

    return categories;
  }
};

async function ProductPage({ params: { id } }) {
  const session = await getServerSession(authOptions);

  const product = await prisma.product.findUnique({
    where: { id },
    include: { options: true },
  });
  const categories = await getData();

  return (
    <div className="flex mmd:my-20 mx-auto sm:flex-col-reverse sm:my-5 overflow-hidden  ">
      <div
        className="w-full flex-3 mx-auto my-20 mmd:my-0  px-4
       grid grid-cols-2  h-96 justify-center items-center gap-2 max-w-6xl mmd:grid-cols-none mmd:grid-rows-2 mmd:h-[680px]  "
      >
        <div className="relative w-full h-full ">
          <Image
            src={product.imageUrl}
            fill
            alt="pic"
            loading="lazy"
            className="object-cover rounded-md absolute "
          />
        </div>
        <div className=" h-full p-6 mx-auto bg-blackk rounded-md  text-slate-300   ">
          {/* Delete btn */}
          {/*   {!session || !session?.user.isAdmin ? (
            " "
          ) : (
            <DeleteBtn id={product.id} />
          )}
 */}
          {/* Delete btn  END*/}

          {/* UPDATE button */}
          {!session || !session?.user.isAdmin ? (
            " "
          ) : (
            <UpdateButton product={product} categories={categories} />
          )}

          {/* UPDATE button */}

          <h1 className="tracking-wide  font-semibold py-2 text-2xl">
            {product.title}
          </h1>
          <p className="font-extralight mb-3">{product.desc}</p>

          <Price product={product} />

          <p className="text-slate-300 font-extralight text-xs  ">
            * You can order max.5 due to logistics issues
          </p>
        </div>
      </div>
      <div className="  flex-1  bg-blackk text-center h-auto  text-white sm:w-auto sm:mx-4 sm:mb-4 sm:rounded-md">
        <CartBox />
      </div>
    </div>
  );
}

export default ProductPage;
