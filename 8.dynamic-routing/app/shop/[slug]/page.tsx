import React from "react";

interface Params {
  params : { slug : string }
}

const page = ({params} : Params) => {
  return (
    <div>
      <p>shop number : {params.slug} </p>
    </div>
  );
};

export default page;
