import NavOthers from "@/components/navOthers";
import React from "react";

export default function AboutLayout({ children }) {
  return (

      <>
        <NavOthers />
        {children}
      </>

  );
}
