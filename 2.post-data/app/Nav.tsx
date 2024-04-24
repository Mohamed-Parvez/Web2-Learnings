import Link from "next/link";
import React from "react";

const Nav = () => {
  const Data = [
    {
      Label: "Dashboard",
      Key: "dashboard",
      href: "/",
    },
    {
      Label: "House",
      Key: "house",
      href: "/house",
    },
  ];
  return (
    <nav className="space-x-10 p-2 border">
      {Data.map((data) => (
        <Link href={data.href} key={data.Key} className="text-black">
          {data.Label}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
