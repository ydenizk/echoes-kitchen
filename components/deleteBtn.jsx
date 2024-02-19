/* "use client";

import React from "react";

import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const DeleteBtn = ({ id }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      router.push("/menu");
      toast("The product has been deleted!");
    } else {
      const data = await res.json();
      toast.error(data.message);
    }
  };

  return (
    <div className="absolute top-4 right-4  z-10 ">
      <button
        onClick={handleDelete}
        className="bg-orange-800 p-1 text-neutral-200 text-sm rounded font-light
        cursor-pointer transition hover:bg-orange-700 "
      >
        Delete 
      </button>
      <Toaster />
    </div>
  );
};

export default DeleteBtn;
 */