import NavOthers from "@/components/navOthers";
import OpenHours from "@/components/openHours";
import Adress from "@/components/adress";
import React from "react";

export default function AboutLayout({ children }) {
  return (

      <div className="w-full overflow-hidden">
        <NavOthers />
        {children}
        <div
          className="w-full max-w-5xl grid grid-cols-2  justify-center items-center gap-8 
          p-2 my-20 mt-40 mx-auto mmd:gap-4 md:grid-cols-1 "
        >
          <Adress />
          <OpenHours />
        </div>
      </div>

  );
}
