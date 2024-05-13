"use client";

import { useState } from "react";

export default function Home() {
  const [state, setState] = useState(0);
  return (
    <main className="flex items-center justify-center mt-6">
      <button
        className="px-4 py-2"
        onClick={() => {
          setState(state + 1);
        }}
      >
        +
      </button>
      <p>{state}</p>
      <button
        className="px-4 py-2"
        onClick={() => {
          setState(state - 1);
        }}
      >
        -
      </button>
    </main>
  );
}
