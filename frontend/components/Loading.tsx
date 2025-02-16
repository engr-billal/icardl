import { Spinner } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#ffffff70] backdrop-blur-sm z-[999]">
      <Spinner />
    </div>
  );
};

export default Loading;
