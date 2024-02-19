import React from "react";
import FormComponent from "./form";

async function ContactPage() {
  return (
    <div className=" flex justify-center items-center">
      <div>
        <div className="  pt-16   mx-auto text-center max-w-2xl">
          <h1 className="uppercase text-4xl font-extrabold tracking-wider mb-6 sm:text-3xl ">
            CONTACT US
          </h1>

          <p className="font-extralight text-sm max-w-3xl   mx-auto tracking-wide leading-6 sm:max-w-lg xs:max-w-md">
            The Echoes Kitchen opened in March 2019 as a burger restaurant
           in Çanakkale and then İstanbul a It
            is relatively small and comfortable, can host up to 40 guests during
            winter and almost double of that during summer due to the huge
            terrace. The price range is from medium to high. The concept of the
            restaurant is “Burgers”.
          </p>
        </div>
        <FormComponent />
      </div>
    </div>
  );
}

export default ContactPage;
