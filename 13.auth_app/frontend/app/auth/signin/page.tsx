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
      <div className="flex flex-col items-center justify-center space-y-6 mt-20 border max-w-[400px] w-full border-slate-400 rounded-[10px] p-10">
        <p className="text-[20px] font-medium">Welcome, Sign In</p>
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
          className="px-4 py-2 ring-1 ring-black rounded-full w-[280px] bg-black text-white hover:bg-white hover:text-black"
          onClick={async () => {
            await fetch("http://localhost:8080/api/auth/signin", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                password: password,
              }),
            }).then(async (res) => {
              const data = await res.json();
              localStorage.setItem("token", data.token);
            });
            router.push("/");
          }}
        >
          Sign In
        </button>
        <p>or</p>
        <Link
          className="px-4 py-2 ring-1 ring-black rounded-full w-[280px] bg-white text-black hover:bg-black hover:text-white"
          href="/api/auth/signin"
        >
          Sign In With Google
        </Link>
        <Link href={"/auth/signup"}>
          Don't have a account,{" "}
          <span className="border-b-2 border-b-black">Sign Up</span>
        </Link>
        <p></p>
      </div>
    </main>
  );
};

export default page;
