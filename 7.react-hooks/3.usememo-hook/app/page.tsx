"use client";

import { useMemo, useState } from "react";

export default function Home() {
  const [state, setState] = useState(0);
  const data = useMemo(() => {
    return state + 1;
  }, []);
  return <h1>{data}</h1>;
}

{
  /* 
  use memo is simply used to store value / cache a value, 
  so after rerendering the function didnt get called again 
  */
}
