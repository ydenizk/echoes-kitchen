import React from 'react'
import Link from "next/link";
import { ImTwitter, ImFacebook } from "react-icons/im";
import { FaInstagramSquare } from "react-icons/fa";

const SocialLinks = () => {
  return (
    <div className="w-full flex justify-center itemms-center mt-4 ">
      <Link href="https://twitter.com/home" className="ml-2 px-2 ">
        <ImTwitter className="text-slate-100 transition hover:text-slate-300 text-2xl " />
      </Link>
      <Link href="https://www.facebook.com" className="ml-2 px-2">
        <ImFacebook className="text-slate-100 transition hover:text-slate-300  text-2xl " />
      </Link>
      <Link href="https://instagram.com/" className="ml-2 px-2">
        <FaInstagramSquare className="text-slate-100 transition hover:text-slate-300  text-2xl " />
      </Link>
    </div>
  )
}

export default SocialLinks