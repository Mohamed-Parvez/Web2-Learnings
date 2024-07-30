"use client";

interface PostProps {
  _id: string;
  postName: string;
  postDescription: string;
}

import Link from "next/link";
export const isSession = localStorage.getItem("token");
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/posts", {
        headers: {
          "Authorization": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => setPosts(res.data.getPosts));
  }, []);
  return (
    <main>
      <nav className="flex items-center justify-between py-4 px-10">
        <div></div>
        {isSession ? (
          <button
            className="px-4 py-2 ring-1 ring-black rounded-full bg-black text-white hover:bg-white hover:text-black"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Log Out
          </button>
        ) : (
          <div className="flex items-center justify-center gap-7">
            <Link href="/auth/signup">
              <button className="px-4 py-2 ring-1 rounded-full ring-black bg-white text-black hover:bg-black hover:text-white">
                Sign Up
              </button>
            </Link>
            <Link href={"/auth/signin"}>
              <button className="px-4 py-2 ring-1 ring-black rounded-full bg-black text-white hover:bg-white hover:text-black">
                Sign In
              </button>
            </Link>
          </div>
        )}
      </nav>
      {isSession ? (
        <div>
          {posts.map((e) => (
            <div className="flex flex-col items-start justify-start space-y-3">
              <p>{e._id}</p>
              <p>{e.postName}</p>
              <p>{e.postDescription}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>do login</p>
      )}
    </main>
  );
}

export default Home;
