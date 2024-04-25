"use client";

import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  houseName: string;
  housePrice: number;
}

const page = async () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Props>();
  return (
    <main>
      <Toaster />
        <form
          className="flex items-center justify-between mt-2 px-2 max-w-[960px]"
          onSubmit={handleSubmit(
            async ({ id, houseName, housePrice }: Props) => {
              await fetch("/api/house", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: id,
                  houseName: houseName,
                  housePrice: housePrice,
                }),
              }).then(() => toast.success("updated Successfully"))
              router.push("/")
            }
          )}
        >
          <input
            className="border rounded-full py-2 px-3"
            placeholder="Edit Id"
            required
            {...register("id")}
          />
          <input
            className="border rounded-full py-2 px-3"
            placeholder="Edit House Name"
            required
            {...register("houseName")}
          />
          <input
            className="border rounded-full py-2 px-3"
            placeholder="Edit House Price"
            required
            {...register("housePrice")}
          />
          <button
            className="px-4 py-2 border bg-yellow-500 text-black hover:text-black
           hover:bg-white border-black rounded-full"
            type="submit"
          >
            Update
          </button>
        </form>
    </main>
  );
};

export default page;
