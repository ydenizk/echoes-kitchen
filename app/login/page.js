import RegisterComponent from "@/components/register";
import SignInComponent from "@/components/signIn";
import React from "react";

const LoginPage = () => {
  return (
    <div className=" w-full h-[540px]  flex justify-center items-center  ">
      <RegisterComponent />
      <SignInComponent />
    </div>
  );
};

export default LoginPage;
