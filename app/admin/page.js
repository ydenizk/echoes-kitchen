import React from "react";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminClient from "./adminClient";

const getData = async () => {
  const res = await fetch(`${process.env.PUBLIC_URL}/api/category`, {
    cache: "no-store",
  });

  if (res.ok) {
    const categories = await res.json();

    return categories;
  }
};

const AdminPage = async () => {
  const categories = await getData();
  const session = await getServerSession(authOptions);

  if (!session || !session?.user.isAdmin) {
    redirect("/login");
  }

  return (
    <div className="my-16 px-6 w-full  ">
      <AdminClient categories={categories} />
    </div>
  );
};

export default AdminPage;
