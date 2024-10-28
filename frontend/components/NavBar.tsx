"use client";
import { useAuth } from "@/contexts/AuthContext";
import { routes } from "@/misc/routes";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineEventNote } from "react-icons/md";
import { TbLogout } from "react-icons/tb";

const NavBar = () => {
  const { logout, user } = useAuth();
  if (!user) return;
  return (
    <div className="shadow-md fixed bottom-0 left-[50%] translate-x-[-50%] max-w-[400px] w-full p-3 px-10 rounded-t-3xl bg-white flex justify-between items-center gap-2">
      <Link href={routes.profile.path}>
        <AiOutlineUser size={25} />
      </Link>
      <Link href={routes.events.path}>
        <MdOutlineEventNote size={25} />
      </Link>
      <TbLogout cursor="pointer" size={25} onClick={logout} />
    </div>
  );
};

export default NavBar;
