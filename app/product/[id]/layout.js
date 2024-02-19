import NavOthers from "@/components/navOthers";
import React from "react";

export default function ProductLayout({ children }) {
  return (
    <div className="w-full overflow-hidden relative">
      <NavOthers />
      {children}
    </div>
  );
}
