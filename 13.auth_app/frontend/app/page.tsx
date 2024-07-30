"use client";

import Link from "next/link";
export const isSession = localStorage.getItem("token");
export default function Home() {
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
      <div></div>
    </main>
  );
}
