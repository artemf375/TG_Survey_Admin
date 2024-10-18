"use client";
import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react";

export default function Admin() {

  const { data: session, status } = useSession()

  return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Admin Panel
        </h1>
        <p>
          User: {session?.user?.address ?? "Not logged in"}
        </p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300" onClick={() => signIn()}>
          Login
        </button>
      </div>
  );
}
