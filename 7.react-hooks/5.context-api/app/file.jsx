"use client";

import { context } from "./page";
import { useContext } from "react";

const File = () => {
  const value = useContext(context);
  return <h1>{value}</h1>;
};

export default File;
