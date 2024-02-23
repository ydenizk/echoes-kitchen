

import React from "react";
import OrderClient from "./orderClient";

const OrdersPage = () => {

  return (
    <div className="my-10 p-8 ">
      <h1 className="text-2xl font-semibold text-blackk mb-6 p-1 border-b-2 border-gray-200">My Orders</h1>
      <OrderClient />
    </div>
  );
};

export default OrdersPage;
