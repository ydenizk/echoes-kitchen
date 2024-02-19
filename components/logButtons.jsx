"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const LogButtons = ({flexType}) => {
  const { status, data: session } = useSession();

  return (
    <div className="w-full flex flex-col items-center  ">
      {status === "authenticated" ? (
        <div className= {`flex ${flexType} justify-center items-center mt-2 mb-8 gap-4 border-none 
          mmd:flex-row`} >
          <Link
            href="/orders"
            className=" py-2 border-2 border-slate-200 text-slate-100 text-center w-36 mx-auto 
 hover:bg-neutral-800  mmd:text-sm   transition  mmd:w-28 mmd:p-2 whitespace-nowrap"
          >
            My Orders
          </Link>

          <button
            className=" py-2 border-2 border-slate-200 text-slate-100 text-center w-36 mx-auto 
 hover:bg-neutral-800 mmd:text-sm    transition  mmd:w-28 whitespace-nowrap mmd:p-2 mmd:px-3"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className=" py-2 border-2 border-slate-200 text-slate-100 text-center w-36 mx-auto transition
 hover:bg-neutral-800   mt-2 mb-8 mmd:text-sm  mmd:w-28"
        >
          Sign in
        </Link>
      )}
    </div>
  );
};

export default LogButtons;
