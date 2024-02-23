"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "react-query";

const OrderClient = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [selectedStatus, setSelectedStatus] = useState({});

  // ... rest of your component

  if (status === "unauthenticated") {
    router.push("/login");
  }

  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("http://localhost:3000/api/orders").then((res) => res.json()),
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
  const handleSubmit = (e, id) => {
    e.preventDefault();
    const form = e.target;
    const input = form.elements[0];
    const status = input.value;

    mutation.mutate({ id, status });

    router.refresh();
  };

  const handleChange = (e, id) => {
    setSelectedStatus({ ...selectedStatus, [id]: e.target.value });
  };

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
    <div className=" py-8 bg-neutral-200 rounded  ">
      <div className="w-full flex-3 text-sm lg:text-xs text-neutral-700 font-semibold  px-2 ">
        <ul className="w-full flex  items-center mb-6 border-b border-neutral-300 px-1">
          <li className=" flex-1 lg:hidden ">Order ID</li>
          <li className=" flex-1">Order Date</li>
          <li className="  flex-1">Amount</li>
          <li className=" flex-3 mx-1 ">Products</li>
          <li className="flex-1">Status</li>
          {status === "authenticated" && session?.user.isAdmin ? (
            <li className="flex-2 text-center">Update Status</li>
          ) : null}
        </ul>

        {data.length > 0 &&
          data.map((dt) => {
            return (
              <ul
                className="w-full flex border-b border-neutral-300  text-sm lg:text-xs font-light px-1 mb-2 pb-1 "
                key={dt.id}
              >
                <h3 className="flex-1 lg:hidden "> {dt.id.slice(0, 8)} </h3>
                <h3 className="flex-1">{dt.createdAt.slice(0, 10)}</h3>
                <h3 className=" flex-1">{dt.price.toFixed(2)}€ </h3>
                <ul className="flex-3 flex flex-col items-start justify-start mx-1">
                  {dt.products.map((d) => {
                    return (
                      <li className=" list-disc" key={d.id}>
                        <span className="text-blackk font-normal">
                          {" "}
                          {d.quantity}
                        </span>{" "}
                        x {d.title.slice(0, 30)} -
                        <span className="text-blackk font-normal">
                          {d.optionTitle}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <h3 className="flex-1 font-semibold md:text-xs text-orange-800 uppercase">
                  {dt.status}
                </h3>

                {status === "authenticated" && session?.user.isAdmin ? (
                  <li className="my-1 text-neutral-500 flex-1 ">
                    <form
                      className="flex justify-center items-center whitespace-nowrap  "
                      onSubmit={(e) => handleSubmit(e, dt.id)}
                    >
                      <div>
                        <select
                          value={selectedStatus[dt.id] || dt.status}
                          className="ring-1 rounded ring-green-900  text-xs capitalize  border-none outline-none"
                          onChange={(e) => handleChange(e, dt.id)}
                        >
                          <option value="Not Paid" className="">
                            Not Paid !
                          </option>
                          <option value="Being Prepared">Being prepared</option>
                          <option value="On Delivery">On delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                        <button
                          type="submit"
                          className="p-1 ml-2 rounded  bg-green-600 text-neutral-700   
                        text-xs cursor-pointer transition hover:bg-green-700"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </li>
                ) : (
                  null
                )}
              </ul>
            );
          })}
      </div>
    </div>
  );
};

export default OrderClient;

