"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { routes } from "@/misc/routes";
import { MdOutlineEventNote } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";

const AdminNavBar = () => {
  const pathSegments = usePathname().split("/");
  const path = `/${pathSegments[1]}${
    pathSegments?.[2] ? `/${pathSegments?.[2]}` : ""
  }`;

  const links = [
    {
      name: "Events",
      path: routes.eventsDashboard.path,
      icon: <MdOutlineEventNote />,
    },
    {
      name: "Requests",
      path: routes.registrationsDashboard.path,
      icon: <FaRegAddressCard />,
    },
  ];

  return (
    <aside className="min-w-[250px] max-w-[300px] w-100 h-screen bg-white flex-col p-4 shadow-md">
      <div className="py-3">
        <Logo />
      </div>
      <ul className="flex-col justify-center gap-2 w-full py-5 border-b-2 border-gray-200">
        {links.map((link, index) => (
          <li
            key={index}
            className={`${
              path === link.path
                ? "bg-[#2F2B430D] text-primary font-semibold"
                : "bg-white text-gray-500"
            } rounded-full mb-2 text-[14px] p-1`}
          >
            <Link href={link.path} className="flex items-center px-5 py-3">
              <span className="mr-5 scale-110">{link.icon}</span>
              <p>{link.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AdminNavBar;
