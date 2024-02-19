import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div key={product.id} className="bg-blackk rounded-lg">
      <Link href={`/product/${product.id}`}>
        <Image
          src={product.imageUrl || "/banner-res.jpg"}
          width={540}
          height={308}
          alt=""
          loading="lazy"
          className="object-cover rounded-md"
        />
      </Link>
      <div className="flex  items-center p-4 mt-2">
        <div className="font-extralight flex-2">
          <h3 className="  tracking-wide mb-1"> {product.title} </h3>
          <p className="font-extralight text-xs text-slate-400">
            {product.desc}
          </p>
        </div>

        <div className="flex flex-1 w-full  justify-end items-center ">
          <h3 className="xs:text-sm"> {product.price} € </h3>
          <Link
            href={`/product/${product.id}`}
            className="ml-4 w-4 h-4 text-blackk bg-slate-400 transition hover:bg-slate-300 opacity-80 text-center leading-4 rounded-sm"
          >
            +
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
