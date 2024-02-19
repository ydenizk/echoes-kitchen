"use client";

import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useEditModalStore } from "@/utils/store";
import AdminEdit from "@/app/admin/adminEdit";
import { RxCross2 } from "react-icons/rx";

const UpdateButton = ({ product }) => {
  const { editFormOpen, openEditForm, closeEditForm } = useEditModalStore();

  return (
    <div className=" text-right  z-10 w-full  ">
      <button
        onClick={() => {
          openEditForm();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="bg-green-600 p-2 px-3 text-neutral-200 text-sm rounded font-light
                    cursor-pointer transition hover:bg-green-700 duration-500 "
      >
        Edit
      </button>
      {/* modals */}
      <div
        className={`absolute top-0 left-0 w-full h-full  rounded-md bg-black opacity-80 z-10 ${
          editFormOpen ? "" : "hidden"
        } `}
      ></div>
      <div
        className={`w-auto h-auto p-2 text-neutral-800 absolute rounded-lg  bg-neutral-100  
         left-1/2 top-24 transform -translate-x-1/2  z-30 shadow-md ${
           editFormOpen ? "" : "hidden"
         }`}
      >
        <div className="bg-gray-50  rounded-lg w-full p-4 ">
          <div className="w-full flex justify-end">
            <button
              onClick={closeEditForm}
              className="font-bold text-lg text-black   "
            >
              <RxCross2 className="text-right w-full " />
            </button>
          </div>

          <h1 className="text-lg uppercase font-semibold text-green-950 text-center w-full">
            Update Order
          </h1>
          {editFormOpen && <AdminEdit key={product.id} product={product} />}
        </div>
      </div>
      {/* modals  END*/}
      <Toaster />
    </div>
  );
};

export default UpdateButton;
