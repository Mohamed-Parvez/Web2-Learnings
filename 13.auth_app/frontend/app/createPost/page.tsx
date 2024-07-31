"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import React from "react";

const page = () => {
  const router = useRouter();
  const [postName, setPostName] = useState("");
  const [postDes, setPostDes] = useState("");
  return (
    <main className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-6 mt-20 border max-w-[400px] w-full border-slate-400 roundeed-[10px] p-10">
        <p className="text-[20px] font-medium">Create Post</p>
        <input
          type="text"
          className="ring-1 ring-black h-10 w-[280px] rounded-[4px] pl-4"
          placeholder="Enter Post Name"
          required
          onChange={(e) => setPostName(e.target.value)}
        />
        <input
          type="text"
          className="ring-1 ring-black h-48 w-[280px] rounded-[4px] pl-4"
          placeholder="Enter Post Description"
          required
          onChange={(e) => setPostDes(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 ring-1 w-[280px] ring-black rounded-full bg-black text-white hover:bg-white hover:text-black"
          onClick={async () => {
            await fetch("http://localhost:8080/api/createPost", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token") as string,
              },
              body: JSON.stringify({
                postName: postName,
                postDescription: postDes,
              }),
            });
            router.push("/");
          }}
        >
          Create Post
        </button>
      </div>
    </main>
  );
};

export default page;
