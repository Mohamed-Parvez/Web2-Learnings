"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data, status } = useSession();
  return (
    <>
      {status === "loading" && <p>Loading...</p>}
      {status === "unauthenticated" && (
        <div>
          <Link href={"/api/auth/signin"}>Log In</Link>
        </div>
      )}
      {status === "authenticated" && (
        <div>
          <p>{data.user?.name}</p>
          <Link href={"/api/auth/signout"}>Sign Out</Link>
        </div>
      )}
    </>
  );
}
