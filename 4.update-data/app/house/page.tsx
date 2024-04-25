"use client";

import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface FormProps {
  id: number;
  houseName: string;
  housePrice: number;
}

const page = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FormProps>();
  return (
    <main>
      <Toaster />
      <form
        className="flex p-2 space-y-4 flex-col items-start justify-start"
        onSubmit={handleSubmit(
          async ({ houseName, housePrice, id }: FormProps) => {
            await fetch("/api/house", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: id,
                houseName: houseName,
                housePrice: housePrice,
              }),
            }).then(() => toast.success("Sent Successfully"));
            reset();
            router.push("/");
          }
        )}
      >
        <input
          className="border rounded-full py-2 px-3"
          placeholder="Enter Id"
          required
          {...register("id")}
        />
        <input
          className="border rounded-full py-2 px-3"
          placeholder="Enter House Name"
          required
          {...register("houseName")}
        />
        <input
          className="border rounded-full py-2 px-3"
          placeholder="Enter House Price"
          required
          {...register("housePrice")}
        />
       
        <button
          type="submit"
          className="px-4 py-2 border border-black hover:text-black
       hover:bg-white rounded-full bg-blue-500"
        >
          Sumbit
        </button>
      </form>
    </main>
  );
};

export default page;
