"use client";
import SplashScreenSVG from "@/assets/splash-screen.svg";
import SplashScreenClipSVG from "@/assets/splash-screen-clip.svg";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { routes } from "@/misc/routes";
import { Helmet } from "react-helmet";
import { APPNAME } from "@/misc/constants";
import { useAuth } from "@/contexts/AuthContext";

const WelcomePage = () => {
  const { user } = useAuth();
  return (
    <main className="w-full min-h-full bg-[#f8f8f8] max-w-[500px] mx-auto overflow-x-clip h-full">
      <Helmet title={routes.welcome.title} />
      <div className="z-20 w-full relative p-4 min-h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-[24px] font-semibold leading-9">{APPNAME}</h1>
        <p className="text-[12px] leading-4 md:max-w-[80%]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since.
        </p>
        <Link
          href={user ? routes.profile.path : routes.login.path}
          className="bg-[#E5E7EB] p-[7px] flex items-center justify-center rounded-full mt-[55px]"
        >
          <FaChevronRight
            className="bg-primary p-4 rounded-full"
            size={60}
            color="#fff"
          />
        </Link>
      </div>
    </main>
  );
};

export default WelcomePage;
