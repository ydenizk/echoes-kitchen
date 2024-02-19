import React from "react";
import { MdLocationOn, MdLocalPhone, MdBorderColor } from "react-icons/md";
import { PiEnvelopeSimpleBold } from "react-icons/pi";
import Link from "next/link";
import { links } from "@/app/data";
import SocialLinks from "./socialLİnks";
import Newsletter from "./newsletter/newsletter";

function Footer() {
  return (
    <div className="w-full h-80  text-stone-200 p-0 mt-10">
      <div
        className="h-64  bg-blackk grid grid-cols-3 gap-8 px-12 items-center justify-center 
              mmd:grid-cols-2"
      >
        <div className="text-left mmd:hidden">
          <h1 className="uppercase text-xl  font-bold tracking-wide mb-3 text-slate-100 pl-1">
            CONTACT US
          </h1>
          <div className="mb-2 text-stone-300">
            <div className="flex mb-2 items-start">
              <MdLocationOn className="text-xl mr-2  " />

              <p className="font-light ">Tristan Street 4 80331 İstanbul</p>
            </div>

            <div className="flex mb-2 items-center">
              <MdLocalPhone className="text-xl mr-2 " />
              <p className="font-light ">216 / 354 76 81</p>
            </div>

            <div className="flex mb-2 items-center">
              <PiEnvelopeSimpleBold className="text-xl mr-2" />
              <p className="font-light ">hello@rtheechoeskitchen.com</p>
            </div>
          </div>
        </div>
        <div className=" ml-20 mmd:ml-0 mmd:text-left ">
          <h1 className="uppercase text-xl font-bold tracking-wide mb-3 text-slate-100 mmd:mt-4">
            CHECK OUT{" "}
          </h1> 

          <ul className="list-disc pl-5 mmd:list-none  ">
            {links.map((link) => {
              return (
                <li className="px-2 tracking-wide" key={link.href}>
                  <Link
                    href={link.href}
                    className="whitespace-nowrap capitalize"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Newsletter />
          <SocialLinks />
        </div>
      </div>
      <div className="h-16 bg-black px-16 ">
        <h1 className="text-xs pt-6  text-stone-400 tracking-wide ">
          &copy;All rights reserved by YdenizK 2023.
        </h1>
      </div>
    </div>
  );
}

export default Footer;
