"use client";

import { useState, useCallback } from "react";

const data = 20;

export default function Home() {
  const [state, setState] = useState(data);
  const finaldata = useCallback(() => {
    return setState(() => state * 2000);
  }, [data]);
  return <h1>{data}</h1>;
}

{
  /* 
    useCallback is used to store functions, it doesnt rerender , it will cache in the memory,
    its like useMemo but use memo is used to cache value, but use callback is used to cache function
  */
}
