"use client";

import React from "react";
import { useFormStatus } from "react-dom";

//useformdtatus u kullanmak ,için ayrı yere aldık form btn i.

const FormBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button className=" w-full  border  border-blackk transition  hover:bg-gray-200 mb-4 uppercase py-1 px-8 tracking-wide text-xl cursor-pointer  ">
      {pending ? (
        <div className="flex justify-center items-center gap-1 ">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700"></div>
          <div className="text-xl font-light">Sending ...</div>
        </div>
      ) : (
        "send"
      )}
    </button>
  );
};

export default FormBtn;
