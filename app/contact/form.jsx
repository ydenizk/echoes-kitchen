"use client";

import React, { useRef } from "react";
import { handleContact } from "./formAction";
import FormBtn from "./formBtn";

const FormComponent = () => {
  const ref = useRef(null);
  return (
    <form
    //submit sonrasu form u reset için bu şekilde kullanıdk.
      ref={ref}
      action={async (formData) => {
        ref.current?.reset();
        await handleContact(formData);
      }}
      className="flex flex-col gap-4 justify-center items-center 
          w-full max-w-xl mx-auto   rounded my-20 sm:max-w-md xs:max-w-xs  "
    >
      <div className=" w-full">
        <input
          className="w-full h-10 border text-blackk
               font-extralight border-slate-600 text-lg rounded outline-0 px-2  "
          type="text"
          name="name"
          required
          placeholder="Name"
        />
      </div>
      <div className="w-full">
        <input
          required
          placeholder="Email"
          name="email"
          type="email"
          className="w-full h-10 text-lg border  text-blackk font-extralight
               border-slate-600  rounded  outline-0 px-2 "
        />
      </div>
      <div className="w-full">
        <textarea
          required
          placeholder="Message"
          name="message"
          type="text"
          rows="6"
          className="rounded w-full  border  text-blackk font-extralight border-slate-600 
               outline-0 px-2"
        ></textarea>
      </div>
<FormBtn />
    </form>
  );
};

export default FormComponent;
