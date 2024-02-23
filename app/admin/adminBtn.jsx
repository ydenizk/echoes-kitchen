"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const AdminButton = () => {
  const { status, data: session } = useSession();

  if (session && session?.user.isAdmin) {
    return (
      <div>
        <Link href="/admin" className="border  border-gray-400 p-2 font-extralight  text-gray-200
        text-sm bg-orange-700 cursor-pointer transition hover:bg-orange-800">Admin</Link>
      </div>
    );
  }else{
    return
  }
};

export default AdminButton;
