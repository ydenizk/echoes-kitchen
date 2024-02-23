"use client";

import React, { useRef } from "react";
import { handleNews } from "./newsAction";
import NewsBtn from "./newsBtn";

const NewsletterClient = () => {
  const ref = useRef(null);
  return (
    <form
      ref={ref}
      action={async (formData) => {
        ref.current?.reset();
        await handleNews(formData);
      }}
      className="flex gap-1 justify-center items-center 
          w-auto    "
    >
      <input
        className="w-64 sm:w-56 h-10 border text-white bg-blackk
               font-extralight border-white outline-0 outline-none px-2  "
        type="email"
        name="email"
        required
        placeholder="Email"
      />

      <NewsBtn />
    </form>
  );
};

export default NewsletterClient;
