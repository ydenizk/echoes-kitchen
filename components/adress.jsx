import React from 'react'
import { MdLocationOn, MdLocalPhone, MdBorderColor } from "react-icons/md";
import { PiEnvelopeSimpleBold } from "react-icons/pi";
import { FaInstagramSquare } from "react-icons/fa";
import Link from 'next/link';

const Adress = () => {
  return (

    <div className=" border-8 border-gray-800 w-full p-6 mmd:p-4 mmd:border-2 mx-auto max-w-md xs:max-w-sm ">
    <h1 className="uppercase text-3xl font-bold mb-8 whitespace-nowrap mmd:text-2xl">
      The echoes kitchen
    </h1>
    <div className="mb-6">
      <div className="flex mb-4 items-center">
        <MdLocationOn className="text-3xl mr-4" />
        <p className="font-light tracking-wide  mmd:text-sm">
          Tristan Street 4 80331 İstanbul
        </p>
      </div>

      <div className="flex mb-4 items-center">
        <MdLocalPhone className="text-3xl mr-4 " />
        <p className="font-light tracking-wide">216 / 354 76 81</p>
      </div>

      <div className="flex mb-4 items-center">
        <PiEnvelopeSimpleBold className="text-3xl mr-4" />
        <p className="font-light tracking-wide">
          hello@rtheechoeskitchen.com
        </p>
      </div>
      <div className="flex mb-4 items-center">
        <MdBorderColor className="text-3xl mr-4" />
        <p className="font-light tracking-wide">
          order@rtheechoeskitchen.com
        </p>
      </div>
    </div>
    <div className="flex justify-around items-center mb-8 ">
      <Link href="https://instagram.com/" className="ml-2 px-2">
        <FaInstagramSquare className=" text-3xl " />
      </Link>
      <Link
        href="/menu"
        className="p-3 border-2 px-5 border-slate-900 transition hover:bg-slate-200 text-slate-900 text-center  "
      >
        Order Now
      </Link>
    </div>
    <h1 className="font-light">We are looking forward to you!</h1>
  </div>
  )
}

export default Adress