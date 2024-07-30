"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import React from "react";

const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <main className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-6 mt-20 border max-w-[400px] w-full border-slate-400 roundeed-[10px] p-10">
        <p className="text-[20px] font-medium">Welcome, Sign Up</p>
        <input
          type="text"
          className="ring-1 ring-black h-10 w-[280px] rounded-[4px] pl-4"
          placeholder="Enter Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="ring-1 ring-black h-10 w-[280px] rounded-[4px] pl-4"
          placeholder="Enter Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 ring-1 w-[280px] ring-black rounded-full bg-black text-white hover:bg-white hover:text-black"
          onClick={async () => {
            await fetch("http://localhost:8080/api/auth/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                password: password,
              }),
            });
            router.push("/auth/signin");
          }}
        >
          Sign Up
        </button>
        <p>or</p>
        <Link href={"/auth/signin"}>
          Already have a account,{" "}
          <span className="border-b-2 border-b-black">Sign In</span>
        </Link>
        <p></p>
      </div>
    </main>
  );
};

export default page;
