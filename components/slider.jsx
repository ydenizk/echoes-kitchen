"use client";

import React, { useState } from "react";

import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Image from "next/image";
import { reviewsData } from "@/app/data";

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevBtn = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex === 0 ? reviewsData.length - 1 : currentIndex - 1
    );
  };
  const nextBtn = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex === reviewsData.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    <div className="flex flex-col justify-center  items-center my-16 mt-24  max-w-screen-lg mmd:hidden" id="kartal">
      <h1 className="text-orange-900 text-2xl font-semibold uppercase tracking-wide mb-8 ">
        / Reviews /
      </h1>
      <div
        className="w-[900px]  h-auto   mx-auto 
        mb-16  overflow-hidden  flex items-center 
        relative "
        >
        {reviewsData.map((dt) => {
          const { id, details } = dt;
          return (
            <div
              key={id}
              className="text-center mx-auto w-[900px]  h-auto transition-transform duration-500
              flex justify-evenly gap-4 px-16  "
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {details.map((subdt) => {
                const { id, title, desc, date, image,rating } = subdt;
                return (
                  <div
                    key={id}
                    className="h-auto w-[270px] text-start text-gray-900 p-1 "
                  >
                    <div className="flex justify-between text-center">
                      <Image
                        src={image}
                        width={40}
                        height={40}
                        alt="avatar"
                        className="rounded-full"
                      />
                      <div className="mr-5">
                        <h3 className="text-left capitalize  tracking-wide font-semibold">
                        
                          {title}{" "}
                        </h3>
                        <p className="text-xs font-light text-slate-600 -mt-1">
                          {date}{" "}
                        </p>
                      </div>
                    </div>
                {/*     <Image
                      src="/rating-star.png"
                      width={64}
                      height={28}
                      alt="star"
                      className=""
                    /> */}
                       <div className="flex">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <span key={index} className="mr-1 text-yellow-500">
            {index <= rating ? '★' : '☆'} {/* Filled star for ratings less than or equal to the rating value, unfilled otherwise */}
          </span>
        );
      })}
    </div>

                    <p className="h-36 font-light text-sm  overflow-y-scroll">
                      {desc}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}

        <button
          className={`  text-red-900 text-3xl  font-bold px-5 mx-auto z-10 transition-all hover:scale-125 absolute top-1/2 -left-2 ${
            currentIndex === 0 ? "hidden" : ""
          }`}
          onClick={prevBtn}
        >
          <AiOutlineLeft />
        </button>
        <button
          className={` text-red-900 text-3xl transition-all hover:scale-125 font-bold mx-auto z-10  absolute  right-2 top-1/2 ${
            currentIndex >= 3 ? "hidden" : ""
          }`}
          onClick={nextBtn}
        >
          <AiOutlineRight />
        </button>
      </div>
    </div>
  );
}

export default Slider;
