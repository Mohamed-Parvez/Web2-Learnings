"use client";

import { createContext } from "react";
export const context = createContext();
import File from "./file";

export default function Home() {
  return (
    <div>
      <context.Provider value="this is context api">
        <File />
      </context.Provider>
    </div>
  );
}
