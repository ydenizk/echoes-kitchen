

import React from "react";
import { redirect } from "next/navigation";


import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminClient from "./adminClient";

const AdminPage =async  () => {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user.isAdmin) {
    redirect("/login");
  }

  return (
    <div className="my-16 px-6 w-full  ">
   <AdminClient />
    </div>
  );
};

export default AdminPage;
