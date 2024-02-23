"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useFormStore } from "@/utils/store";
import toast ,{Toaster} from "react-hot-toast";

const RegisterComponent = () => {
  const { openSignInForm, closeSignInForm, signInFormOpen } = useFormStore();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const registerUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.PUBLIC_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    const userInfo = await res.json();

    if (res.ok) {
      openSignInForm();
    }
  };


  //google github sign  toast için bu şekilde yapıoruz
  const handleSignIn = (provider) => {
    signIn(provider)
      .then(() => {
        toast.success(`You are Logged in  successfully..`);
      })
      .catch((error) => {
        toast.error(`Failed to log in..`);
        console.error("SignIn error:", error);
      });
  };
  

  return (
    <div className={`w-80  font-light ${signInFormOpen ? "hidden" : "block"}`}>
      <div className=" w-80 h-auto  text-center bg-neutral-800 p-4 py-2 ">
        <form className="   text-center bg-neutral-800" onSubmit={registerUser}>
          <div className="text-neutral-800 w-full  flex justify-end ">
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
          <p className="uppercase my-1 text-lg font-semibold text-neutral-200">
            Register
          </p>

          <div className="border-b border-t border-neutral-300 py-2">
            <p className="text-sm text-neutral-300 text-left my-1">
              Create an Account
            </p>
            <div className="w-full my-2 ">
              <input
                className="w-full p-1 text-neutral-500   outline-none "
                placeholder="Name"
                type="text"
                id="name"
                name="name"
                label="Name"
                value={data.name}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                }}
              />
            </div>
            <div className="w-full my-2">
              <input
                className="w-full p-1 text-neutral-500 outline-none "
                placeholder="Email"
                type="email"
                id="email"
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
                className="w-full p-1 text-neutral-500 outline-none "
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

            <button className="w-full mt-4    bg-neutral-100 p-1 text-blackk  shadow-md transition hover:bg-neutral-300 ">
              Register
            </button>
          </div>
        </form>
        <div className="text-xs text-neutral-300 flex justify-start pl-1 mt-1 items-center">
          <p className="">Already have an account?</p>
          <button
            onClick={openSignInForm}
            className=" pl-1 font-semibold transition hover:text-neutral-100"
          >
            Sign in
          </button>
        </div>
        <p className="text-center text-sm text-neutral-400 my-[2px]">or</p>
        <button
          //onClick={() => signIn("google")}
          onClick={() => handleSignIn("google")}
          className="w-full flex bg-bgcolortext-sm  p-2 items-center mb-2 border border-neutral-200 shadow-md transition hover:bg-neutral-700"
        >
          <FcGoogle className="text-lg" />
          <span className="w-full text-center text-neutral-200 text-sm">
            Continiue with Google
          </span>
        </button>
        <button
         // onClick={() => signIn("github")}
         onClick={() => handleSignIn("github")}
          className="w-full flex bg-bgcolortext-sm  p-2 items-center mb-2 border border-neutral-200 shadow-md transition hover:bg-neutral-700 "
        >
          <FaGithub className="text-lg text-white" />
          <span className="w-full text-center text-neutral-200 text-sm">
            Continiue with Github
          </span>
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default RegisterComponent;
