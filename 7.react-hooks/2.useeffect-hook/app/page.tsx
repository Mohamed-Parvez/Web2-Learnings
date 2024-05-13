"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [state, setState] = useState(0);
  useEffect(() => {
    alert("state is changed");
  }, [state]);
  return (
    <main className="flex items-center justify-center">
      <p>{state}</p>
      <button
        className="px-4 py-2"
        onClick={() => {
          setState(state + 1);
        }}
      >
        +
      </button>
    </main>
  );
}
