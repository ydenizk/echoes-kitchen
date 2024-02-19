import NavOthers from "@/components/navOthers";
import React from "react";

export default function LoginLayout({ children }) {
  return (
    <div className="w-full overflow-hidden">
      <NavOthers />
      {children}
    </div>
  );
}
