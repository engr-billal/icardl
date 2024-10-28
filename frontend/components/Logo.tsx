import { APPNAME } from "@/misc/constants";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="font-bold text-[25px] text-primary">
      {APPNAME}
    </Link>
  );
};

export default Logo;
