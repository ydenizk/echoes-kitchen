import NavOthers from "@/components/navOthers";
import React from "react";

export default function PaymentLayout({ children }) {
  return (

      <div className="w-full overflow-hidden">
        <NavOthers />
        {children}
      </div>

  );
}
