import NavHero from "@/components/navHero";
import { BsFillHeartFill } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import OpenHours from "@/components/openHours";

import Slider from "@/components/slider";
import Adress from "@/components/adress";

export default function Home() {
  return (
    <div className="flex justify-center items-center overflow-hidden ">
      <div className="w-full">
        <NavHero />

        {/* Details section */}
        <div className="w-full max-w-screen-lg text-center mx-auto pb-10 my-8 mmd:my-16 ">
          <h1
            className="uppercase text-4xl font-extrabold tracking-wider mb-6 mmd:text-2xl
         sm:text-xl xs:text-base"
          >
            YOUR BURGER-SNACKS POINT IN İSTANBUL
          </h1>
          <h3
            className="uppercase text-2xl font-semibold tracking-wide mb-12 mmd:text-lg 
           sm:text-base 
            mmd:mb-8 "
          >
            HOMEMADE BURGERS & street food{" "}
            <BsFillHeartFill className="text-red-400 text-3xl mx-auto my-2" />{" "}
          </h3>
          <p className="font-light text-sm tracking-wide leading-6 x ">
         Echoes kitchen is your second adress.
          </p>
          <p
            className="font-light text-sm max-w-3xl mx-auto tracking-wide mb-6  leading-6 
         mmd:max-w-[440px] xs:text-[400px] "
          >
            In our place, you can finally do more than just eat a burger because
            our burgers are exclusively available in mini-size. Equipped with a
            notepad and pen, you create your own personal menu. By the way, 2-3
            mini-burgers are roughly equivalent to a standard-sized burger, but
            you can, of course, also order just one or 4, 5, 6, 7, 8... if you
            prefer.
          </p>
          <p className="font-light text-sm tracking-wide ">
            Feel free to combine it the way you like it…
          </p>
        </div>
        {/* ...... */}

        <div className="relative w-full h-96  my-12  ">
          <div className="w-full h-full grid grid-cols-2">
            <div className="relative w-full h-full ">
              <Image
                src="/reserv-1.jpg"
                alt="pic"
                fill
                className="top-0 left-0 absolute"
              />
            </div>

            <div className="relative w-full h-full ">
              <Image
                src="/details.jpg"
                alt="pic"
                fill
                className="top-0 left-0 absolute"
              />
            </div>
          </div>

          <div
            className="absolute z-10 w-[520px] h-72  border-8 border-gray-700
            bg-slate-100 t p-4 left-1/2 transform -translate-x-1/2 top-36 opacity-90"
          >
            <h1 className="uppercase text-xl font-extrabold  mb-2 ">
            Echoes burgers are great present to loved ones.
            </h1>
            <p className="font-light text-sm  mx-auto   mb-6 ">
            We have only got one rule: there are no rules. Our menu is an eclectic mix of global flavors, inspired by our chefs travels around the world. From Istanbul meat ravioli to ramen cacio e pepe, our menu is always unique and forever evolving. With a full raw bar, 
            vegan, vegetarian and gluten-free options, we have truly got something for everyone.
            </p>
            <Link
              href="/menu"
              className="p-3 border-2 border-slate-900 transition hover:bg-slate-200   "
            >
              Order Now
            </Link>
          </div>
        </div>

        {/* Details section....END */}

        <div
          className="w-full max-w-5xl grid grid-cols-2  justify-center items-center gap-8 
          p-2 my-20 mt-40 mx-auto mmd:gap-4 md:grid-cols-1 "
        >
          <Adress />
          <OpenHours />
        </div>
        <Slider />
      </div>
    </div>
  );
}
