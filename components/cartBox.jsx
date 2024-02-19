"use client";

import React, { useEffect } from "react";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import Link from "next/link";
import { useCartStore } from "@/utils/store";

const CartBox = () => {
  const { totalItems } = useCartStore();

  //bu useeffect i hydration için yani sayfa yenılemede cart daj-kı sayılar aynı kalsın
  //istediğimiz için ,error verdiğiği için onu engellemek için yapuoruyz
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <div className="py-16 sm:py-6 sm:w-full sm:mx-4">
      <div className="flex items-center  justify-center pb-8  ">
        <PiShoppingCartSimpleThin className="text-[60px] text-slate-200  sm:text-[40px] " />
        <h1 className=" text-3xl sm:text-xl text-slate-200">({totalItems}) </h1>
      </div>

      {totalItems === 0 ? (
        <div className="font-light uppercase sm:text-sm"> Your Cart is Empty !</div>
      ) : (
        <Link
          href="/cart"
          className="rounded-md uppercase  bg-slate-200  w-1/2 p-3 text-center 
      mx-auto transition hover:bg-slate-400  text-blackk cursor-pointer "
        >
          Go to Cart
        </Link>
      )}
    </div>
  );
};

export default CartBox;
