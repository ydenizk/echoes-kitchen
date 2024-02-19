"use client";

import React, { useState } from "react";

import { IoAddCircleOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import OrderClient from "../orders/orderClient";
import AdminCreate from "./adminCreate";
import AdminUpdateDelete from "./adminUpdateDelete";

const AdminClient = () => {
  const [activeTab, setActiveTab] = useState("orders");

  const tabContent = {
    create: (
      <div
        className="bg-gray-50 text-medium text-gray-500 dark:text-gray-400
    dark:bg-gray-800 rounded-lg w-full py-4 max-w-lg "
      >
        <h1 className="w-full text-center text-neutral-100 text-lg font-semibold uppercase">
          Cretae New Product
        </h1>
        <AdminCreate />
      </div>
    ),
    orders: (
      <div className="w-full ">

        <OrderClient />{" "}
      </div>
    ),
    updateDelete: <div>
      <AdminUpdateDelete />
    </div>,
  };

  const tabs = [
    { id: "orders", title: "Orders" },
    { id: "create", title: "Create Product" },
    { id: "updateDelete", title: "Update - Delete Product" },
  ];

  return (
    <div className="flex gap-4 w-full  md:flex-col md:items-center  ">
      <div
        className="flex flex-col  text-sm gap-4
      font-medium text-gray-500 dark:text-gray-400 md:flex-row md:w-full  md:items-center md:justify-center "
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`whitespace-nowrap gap-4 mb-4 md:max-w-fit   inline-flex items-center px-4
           py-3 rounded-lg text-white transition hover:opacity-90 ${
             activeTab === tab.id ? "bg-orange-900 " : "bg-gray-800"
           }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="w-full  p-4 ml-8 md:ml-0 ">{tabContent[activeTab]}</div>
    </div>

  );
};

export default AdminClient;
