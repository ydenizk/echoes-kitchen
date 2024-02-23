import React from "react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <main className="w-full flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-[1024px] max-auto text-center mt-24">
        <h1 className="uppercase text-4xl font-extrabold tracking-wider mb-24 sm:text-3xl xs:text-2xl sm:mx-4">
          our passion...how everything started
        </h1>
        <div>
          <div className="flex gap-4 mx-8 mmd:flex-col mmd:items-center">
            <div className="border-2 border-blackk px-16 py-6 text-left z-10 lg:px-10 ">
              <h1 className="uppercase text-3xl font-extrabold tracking-wider ">
                We love Burgers
              </h1>
              <div className="w-[15%] h-1 bg-black text-left my-4"></div>
              <p className="font-extralight text-sm max-w-3xl mx-auto tracking-wide leading-6">
                The Echoes Kitchen opened in March 2019 as a Mediterranean club
                restaurant in Prenzlauer Berg, Berlin and later moved to Mitte.
                It is relatively small and comfortable, can host up to 40 guests
                during winter and almost double of that during summer due to the
                huge terrace. The price range is from medium to high. The
                concept of the restaurant is “Fine Casual Dining”, which is
                based on the following values: * high level of service and
                exceptional hospitality * * top quality products and exclusive
                creative dishes * * unique modern interior design that make a
                visit special * * is thought as a place for returning customers
                that feel at home
              </p>
            </div>

            <Image
              src="/about-1.jpg"
              width={540}
              height={360}
              alt=""
              className="object-contain -ml-12 -mt-48 mmd:ml-0 mmd:-mt-10"
            />
          </div>

          <div className="flex gap-4 my-36 pl-16 mx-8 mmd:flex-col mmd:pl-0 mmd:items-center mmd:gap-0">
            <Image
              src="/about-2.jpg"
              width={480}
              height={600}
              alt=""
              className="object-contain mmd:hidden"
            />
            <div className="border-2 border-blackk px-16 py-16 text-left z-10 max-w-md  mt-32 -ml-12  mmd:ml-0 mmd:mt-16">
              <h1 className="uppercase text-3xl font-extrabold tracking-wider ">
                We love People
              </h1>
              <div className="w-[15%] h-1 bg-black text-left my-4"></div>
              <p className="font-extralight text-sm max-w-3xl mx-auto tracking-wide leading-6">
                Made fresh right in-store: from meat and veggies to bread. For a
                more real juicy taste, without any hidden ingredients. We exist
                to let people fully enjoy a burger with less guilt and more
                pleasure. So if you’re going to sin, sin smart at our place.
                Tasty, sexy, and delicious burgers for life’s finest moments.
                Made fresh right in-store: from meat and veggies to bread. For a
                more real juicy taste, without any hidden ingredients. We exist
                to let people fully enjoy a burger with less guilt and more
                pleasure. So if you’re going to sin, sin smart at our place.
                Tasty, sexy, and delicious burgers for life’s finest moments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
