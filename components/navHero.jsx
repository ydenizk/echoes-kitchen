import React from "react";
import Link from "next/link";
import LogoSide from "./logoSide";
import { links } from "@/app/data";
import AdminButton from "@/app/admin/adminBtn";


const NavHero = () => {


  const logBtnsStatsus = "flex-col";
  return (
    <div
      className="flex justify-center items-start  h-screen w-full   
    mmd:flex-col  "
    >
      <div className="flex-1 bg-blackk h-[90%] w-full   ">
        <LogoSide />
      </div>
      <div className="flex-2 bg-banner  w-full h-[90%]  bg-cover mmd:bg-resbanner ">
        <nav className="w-full mmd:border-t">
          <ul
            className="w-full flex justify-center items-center gap-1 h-24 bg-blackk opacity-70  
 text-slate-100 p font-semibold mmd:opacity-80 "
          >
            {links.map((link) => {
              return (
                <li
                  className="px-2 tracking-wide border border-transparent transition
                 hover:border-neutral-100 duration-300  p-1"
                  key={link.href}
                >
                  <Link
                    href={link.href}
                    className="hover:text-slate-300 transition uppercase"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
<AdminButton />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavHero;
