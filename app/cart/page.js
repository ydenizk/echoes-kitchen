"use client";

//zustand olduğu için doğal olarak client side

import React, { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { TiTimes } from "react-icons/ti";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function CartPage() {
  const { products, totalItems, totalPrice, removeFromCart, resetCart } =
    useCartStore();

  const { data: session } = useSession();
  const router = useRouter();

  //bu useeffect i hydration için yani sayfa yenılemede cart daj-kı sayılar aynı kalsın
  //istediğimiz için ,error verdiğiği için onu engellemek için yapuoruyz
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  //fiyatı yuvarlamak için
  function roundFunction(number) {
    return Math.round(number * 20) / 20;
  }

  //post order
  const handleCheckOut = async () => {
    if (!session) {
      router.push("/login");
    } else {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: totalPrice,
            products,
            status: "Not Paid!",
            userEmail: session.user.email,
          }),
        });
        const data = await res.json();
        resetCart();
        router.push("/payment");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="bg-blackk my-24 mx-4 mmd:rounded ">
      <div
        className="w-full flex justify-center items-center mt-8 px-4 py-12 pb-8 text-slate-300
           border-t border-slate-300 "
      >
        <div className=" w-full mt-8 h-auto  flex items-center justify-center mmd:flex-col  ">
          <div className="flex-2 w-full flex flex-col mmd:border-b pb-8">
            {/* single item */}

            {products.length > 0 ? (
              products.map((product) => {
                return (
                  <div
                    className="w-full flex justify-around  items-center mb-4"
                    key={product.id}
                  >
                    <Link href={`/product/${product.id}`}>
                      <Image
                        src={product.im || "/banner-res.jpg"}
                        width={150}
                        height={150}
                        alt=""
                        className="object-contain rounded-md border border-slate-500"
                      />
                    </Link>

                    <div>
                      <h1 className="text-lg font-semibold sm:text-base">
                        {product.title}{" "}
                        <span className="ml-2 font-light">
                          {" "}
                          x {product.quantity}{" "}
                        </span>
                      </h1>
                      <h4 className="font-extralight sm:text-sm capitalize">
                        {product.optionTitle}{" "}
                      </h4>
                    </div>
                    <h1 className="text-lg font-semibold">
                      {roundFunction(product.price)} €{" "}
                    </h1>
                    <button
                      className="text-lg font-semibold cursor-pointer text-orange-700 z-30"
                      onClick={() => removeFromCart(product)}
                    >
                      <TiTimes className="text-xl" />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="w-full text-white  mx-auto text-center mmd:my-10 ">
                <h1 className="text-white text-2xl mb-6">
                  No items added yet !
                </h1>
                <Link
                  href="/category"
                  className="uppercase border bg-slate-300 text-blackk rounded w-1/2 p-3 text-center 
             mx-auto    transition hover:bg-slate-400 duration-300 cursor-pointer"
                >
                  Menu
                </Link>
              </div>
            )}

            {/* .......single item END */}
          </div>
          <div
            className="flex-1 w-full mmd:w-2/3  h-full border-l border-text-slate-400 
              flex flex-col   justify-center items-center p-6 mmd:border-none "
          >
            <div className="flex items-center mt-4 justify-center mb-8 ">
              <PiShoppingCartSimpleThin className="text-[60px] text-slate-200  sm:text-[40px] " />
              <h1 className=" text-3xl sm:text-xl text-slate-200">
                ({totalItems}){" "}
              </h1>
            </div>
            <div className="flex    w-full justify-between">
              <p className="tracking-wide font-extralight text-lg">
                Subtotal ({totalItems} items)
              </p>
              <h1 className="tracking-wide text-lg">
                {roundFunction(totalPrice)} €
              </h1>
            </div>
            <div className="flex   w-full justify-between">
              <p className="tracking-wide text-lg  font-extralight">Delivery</p>
              <h1 className="tracking-wide text-lg"> 0.00 €</h1>
            </div>
            <div className="flex justify-between   w-full mt-4 py-3 border-t border-slate-500">
              <p className="tracking-wide text-lg">TOTAL(inc. VAT)</p>
              <h1 className="tracking-wide text-lg">
                {roundFunction(totalPrice)} €
              </h1>
            </div>

            <button
              onClick={handleCheckOut}
              className="uppercase border border-slate-300 w-1/2 p-3 text-center 
             mx-auto d  mt-12 transition hover:bg-slate-800 duration-300 cursor-pointer"
            >
              Checkout
            </button>
            {/*             <button onClick={() => resetCart()}>xx</button> */}
            <div className="w-full text-left mt-8 text-neutral-300">
              <p className="font-light text-xs">
                * Free Delivery will be until 10.02.2024
              </p>
              <p className="font-light text-xs">
                * Order cancellation is not possible for online orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
