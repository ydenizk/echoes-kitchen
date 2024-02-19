"use client";

import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
//import { toast } from "react-hot-toast";
//import { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation";
import { useFormStore } from "@/utils/store";
import toast, { Toaster } from "react-hot-toast";

const SignInComponent = () => {
  const { openSignInForm, closeSignInForm, signInFormOpen } = useFormStore();

  const { status, data: session } = useSession();
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  /*  const loginUser = async (e) => {
    e.preventDefault();
    try {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((result) => {
          if (result?.error) {
            console.log(result.error);
            toast.error("Login failed. Please try again.");
          } else {
            toast.success("You login successfully..");
            router.push("/menu");
            setLogSideOpen(false);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("An error occurred. Please try again.");
        });
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred.");
    }
  }; */
  const loginUser = async (e) => {
    e.preventDefault();
    /*   try { */
    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (result?.error) {
      console.log(result.error);
      toast.error("Login failed. Please try again.");
    } else {
      toast.success("You login successfully.");
      setTimeout(() => {
        router.push("/menu");
      }, 1000);
    }
  };

  return (
    <div className={`w-80  font-light ${signInFormOpen ? "block" : "hidden"}`}>
      <div className="w-80 h-auto p-4   pb-8  text-center bg-neutral-800">
        <form className=" text-center bg-neutral-800" onSubmit={loginUser}>
          <div
            onClick={() => setLogSideOpen(false)}
            className="text-neutral-800 w-full  flex justify-end "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5   hover:text-brown transition"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <p className="uppercase my-2  text-lg font-semibold text-neutral-200">
            Sign In
          </p>

          <div className="border-b border-t border-neutral-300 py-2">
            <div className="w-full my-2">
              <input
                className="w-full p-1 text-neutral-500 outline-none "
                placeholder="Email"
                id="email"
                type="email"
                label="Email"
                value={data.email}
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
                required
              />
            </div>
            <div className="w-full my-2">
              <input
                className="w-full p-1 text-neutral-500 outline-none"
                placeholder="Password"
                type="password"
                id="password"
                label="Password"
                value={data.password}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
                required
              />
            </div>

            <button className="w-full mt-4    bg-neutral-100 text-blackk p-1   shadow-md transition hover:bg-neutral-300">
              Sign in
            </button>
            <Toaster />
          </div>
        </form>

        <div className="text-xs text-neutral-300 flex justify-start pl-1 mt-1 items-center ">
          <p className="">Do not have an account?</p>
          <button
            onClick={closeSignInForm}
            className=" pl-1 font-semibold transition hover:text-neutral-100"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
