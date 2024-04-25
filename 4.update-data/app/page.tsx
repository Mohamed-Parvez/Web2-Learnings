"use client";

import toast, { Toaster } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  houseName: string;
  housePrice: number;
}

export default async function Home() {
  const router = useRouter();
  const data = await fetch("http://localhost:3000/api/house", {
    cache: "no-store",
  });
  const getdata: Props[] = await data.json();
  return (
    <main>
      <Toaster />
      {getdata.map((data) => (
        <div className="flex items-center justify-between max-w-[400px] m-2 p-2">
          <p>{data.id}</p>
          <p>{data.houseName}</p>
          <p>{data.housePrice}</p>
          <button
            type="button"
            onClick={() => { router.push("./house/edit") }}
          >
            <FaEdit size={20} />
          </button>
          <button
            className="px-4 py-2 border bg-red-500 text-black hover:text-black
           hover:bg-white border-black rounded-full"
            onClick={async () => {
              await fetch("/api/house", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: data.id,
                  houseName: data.houseName,
                  housePrice: data.housePrice,
                }),
              }).then(() => toast.success("Deleted Successfully"));
              window.location.reload();
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </main>
  );
}
