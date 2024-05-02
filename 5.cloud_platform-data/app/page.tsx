"use client";
interface ResultInfo {
  public_id: string;
}

import { CldUploadWidget, CldImage } from "next-cloudinary";
import { useState } from "react";

export default function Home() {
  const [publicId, SetPublicId] = useState("");
  return (
    <main className="m-5">
      {publicId && (
        <CldImage src={publicId} height={270} width={180} alt="images" />
      )}
      <CldUploadWidget
        uploadPreset="ghvodht3"
        onUpload={(result) => {
          if (result.event !== "success") return;
          console.log(publicId);
          const info = result.info as ResultInfo;
          SetPublicId(info.public_id);
        }}
      >
        {({ open }) => (
          <button
            className="px-4 py-2 rounded-full border bordder-black bg-blue-500"
            onClick={() => open()}
          >
            upload
          </button>
        )}
      </CldUploadWidget>
    </main>
  );
}
