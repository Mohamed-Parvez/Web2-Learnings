"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

interface PostsProps {
  _id: string;
  postName: string;
  postDescription: string;
}

const page = () => {
  const [posts, Setposts] = useState<PostsProps[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/userPosts", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => Setposts(res.data.getUserPosts));
  }, []);
  return (
    <div>
      {posts.map((e) => (
        <div className="flex justify-center space-x-10 mt-6 w-[440px] mx-10 ring-1 ring-slate-300">
          <div className="flex flex-col py-6 items-start justify-start space-y-3">
            <p>{e._id}</p>
            <p>{e.postName}</p>
            <p>{e.postDescription}</p>
          </div>
          <div className="flex items-center flex-col space-y-4 justify-center">
            <button
              className="px-4 py-2 ring-1 w-[140px] ring-black rounded-full bg-black text-white hover:bg-white hover:text-black"
              onClick={async () => {
                await fetch("http://localhost:8080/api/deletePost", {
                  method: "DELETE",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token") as string,
                  },
                  body: JSON.stringify({
                    _id: e._id,
                  }),
                }).then(() => window.location.reload());
              }}
            >
              Delete Post
            </button>
            <Link href={{ query: { _id: e._id }, pathname: "/updatePost" }}>
              <button className="px-4 py-2 ring-1 w-[140px] ring-black rounded-full bg-black text-white hover:bg-white hover:text-black">
                Update Post
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
