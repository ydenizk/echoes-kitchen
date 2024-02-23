"use client";

import React from "react";
import { useFormStatus } from "react-dom";

const NewsBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button className=" p-[7px] cursor-pointer border border-white uppercase transition hover:bg-gray-800">
      {pending ? (
        <div className="flex justify-center items-center gap-1 ">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        </div>
      ) : (
        "send"
      )}
    </button>
  );
};

export default NewsBtn;
