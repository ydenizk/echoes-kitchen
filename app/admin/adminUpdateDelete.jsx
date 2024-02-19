"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

const AdminUpdateDelete = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  //framer
  const modalVariants = {
    hidden: { opacity: 0.5, y: "15%" },
    visible: { opacity: 1, y: 0 },
  };

  if (status === "unauthenticated") {
    router.push("/login");
  }

  const queryClient = useQueryClient();

  //get all products
  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch(`${process.env.PUBLIC_URL}/api/products`).then((res) => res.json()),
  });

  //delete mutation
  const deleteMutation = useMutation(
    (id) => {
      return fetch(`${process.env.PUBLIC_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
        toast.success("Product deleted successfully");
        router.refresh();
      },
      onError: () => {
        toast.error("Failed to delete product");
      },
    }
  );

  //update mutation

  /*   const updateMutation = useMutation({
    mutationFn: (data) => {
      const { id, ...updateData } = data; // Destructure to separate `id` and the rest of the product data
      return fetch(`http://localhost:3000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData), // Use the update data here
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product updated successfully");
      router.refresh()
    },
    onError: () => {
      toast.error("Failed to update product");
    },
  });
   */

  if (isLoading) {
    return (
      <div className="flex justify-center items-center gap-4 h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <div className="text-xl font-light">Loading ...</div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className=" p-8 bg-neutral-100 rounded-md   ">
      {/* modal Delete.. */}
      <div
        className={`absolute top-0 left-0 w-full h-full  rounded-md bg-black z-10 opacity-60 ${
          modalOpen ? "" : "hidden"
        } `}
      ></div>
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={modalVariants}
            transition={{ duration: 0.4 }}
            className="w-64 h-36 p-2 text-neutral-800 absolute rounded  bg-neutral-100 top-[20%]  left-[40%]
         md:left-1/3  md:top-[15%] transform     z-10 "
          >
            <div className="w-full flex justify-end">
              <button onClick={() => setModalOpen(false)}>
                <RxCross2 />
              </button>
            </div>

            <p className="text-center my-2 text-gray-700">Are you sure?</p>
            <div className="flex w-full items-center justify-evenly   ">
              <button
                // onClick={() => deleteMutation.mutate(product.id)}
                className=" bg-gray-400 p-1 px-3 text-neutral-200 text-sm rounded font-light
        cursor-pointer transition hover:bg-orange-800 "
              >
                Yes
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className=" bg-gray-900 p-1 px-4 text-neutral-200 text-sm rounded font-light
        cursor-pointer transition"
              >
                No
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* modal DELETE ..end */}

      <div className="w-full    text-neutral-800  px-2  sm:text-xs ">
        {data?.length > 0 ? (
          <div className="w-full flex flex-col gap-4">
            {data.map((product) => {
              return (
                <div
                  key={product.id}
                  className="flex  items-start  gap-x-8 w-full pb-4 border-b border-neutral-300  "
                >
                  <Image
                    src={product.imageUrl}
                    width={100}
                    height={100}
                    className="object-cover  rounded-md "
                    alt="pic"
                  />

                  <div className="flex flex-col gap-2 ">
                    <div className="flex items-start  gap-8">
                      <h1>{product.desc.slice(0, 20)} </h1>
                      <h3>{product.title} </h3>
                    </div>
                    <h3 className="text-normal font-semibold">
                      {" "}
                      {product.price.toFixed(2)} €{" "}
                    </h3>
                  </div>

                  <div className="ml-auto flex  justify-center items-center sm:flex-col   gap-2">
                    <Link
                    href={`/product/${product.id}`}
                      className="bg-green-600 p-1 px-3 text-neutral-200 text-sm rounded font-light
                    cursor-pointer transition hover:bg-green-700  "
                    >
                      Edit
                    </Link>
                    <button
                      // onClick={() => deleteMutation.mutate(product.id)}
                      onClick={() => {
                        setModalOpen(true);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="bg-orange-800 p-1 text-neutral-200 text-sm rounded font-light
                       cursor-pointer transition hover:bg-orange-700  "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div> There is no Products in Database</div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default AdminUpdateDelete;
