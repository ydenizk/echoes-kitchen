import React from "react";
import Link from "next/link";
import Image from "next/image";
import SocialLinks from "./socialLİnks";
import LogButtons from "./logButtons";

const LogoSide = () => {
  const logBtnsStatsus="flex-col"

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between 
    items-center    mmd:justify-center mmd:h-[342px] relative ">
      <Link href="/">
        <Image
          src="/log.png"
          width={200}
          height={200}
          alt="logo"
          className="rounded-full opacity-90 mx-auto my-4 mmd:mx-0  "
        />
      </Link>
      <SocialLinks />
      <LogButtons flexType={LogButtons} />
    </div>
  );
};

export default LogoSide;
