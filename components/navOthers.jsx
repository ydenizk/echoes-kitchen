"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LogButtons from "./logButtons";
import { links } from "@/app/data";
import { motion, AnimatePresence } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import AdminButton from "@/app/admin/adminBtn";

const NavOthers = () => {
  const [navOpen, setNavOpen] = useState(false);
  const logBtnsStatsus = "flex-row";

  return (
    <div className="flex h-80 ">
      <div
        className='bg-blackk relative after:content-[""] after:absolute  
          after:w-12  after:h-80  after:bg-blackk after:z-10 after:top-0 after:right-0 after:-skew-x-6 
          after:origin-bottom-right xs:hidden  w-full'
         >
        <button
          onClick={() => setNavOpen(!navOpen)}
          className="text-slate-200 transition bg-gray-500 hover:bg-gray-700
             p-2 px-3 absolute top-8 left-8 tracking-wide rounded hidden z-30 sm:block "
        >
          <RxHamburgerMenu className="text-white text-lg" />
        </button>
        <div className="top-9 left-[90px] absolute hidden sm:block">
          <AdminButton />
        </div>

        <Link href="/">
          <Image
            src="/log.png"
            width={150}
            height={150}
            alt="logo"
            className="rounded-full opacity-90 mx-auto my-8 mb-4 "
          />
        </Link>

        <AnimatePresence>
          {navOpen && (
            <motion.ul
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute -right-2 top-4 w-48 flex flex-col gap-1
               text-neutral-100 p-1 z-30 text-right "
            >
              {links.map((link, i) => {
                return (
                  <motion.li
                    initial={{ opacity: 0, x: -(40 * i) }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -(40 * i) }}
                    transition={{ duration: 1 }}
                    className="w-full p-1 sm:p-0"
                    key={link.href}
                  >
                    <Link
                      href={link.href}
                      className="hover:text-slate-300 border-b border-transparent 
                      transition uppercase w-full hover:border-b-white pb-1 sm:text-sm"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>

        <h1 className="text-2xl uppercase font-semibold z-30  text-white w-full  text-center px-4 mb-4 md:text-xl">
          The echoes kitchen
        </h1>

        <LogButtons flexType={logBtnsStatsus} />
      </div>

      <div
        className={`bg-menu-banner   bg-cover relative text-right p-8
        transion-width duration-700 sm:bg-bottom   ${
          navOpen ? "w-[30%]  " : "w-full sm:w-0 sm:p-0 "
        }  `}
         >
        <button
          onClick={() => setNavOpen(!navOpen)}
          className="text-slate-200 transition   bg-gray-500 hover:bg-gray-700   p-2 px-3 tracking-wide rounded sm:hidden "
        >
          <RxHamburgerMenu className="text-white text-lg" />
        </button>
        
        <div className="top-9 right-[90px] absolute  sm:hidden">
          <AdminButton />
        </div>
      </div>
    </div>
  );
};

export default NavOthers;
