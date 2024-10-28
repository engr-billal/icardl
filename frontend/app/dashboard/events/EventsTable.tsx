"use client";
import React from "react";
import { Event } from "@/misc/interfaces";
import Status from "./Status";
import Link from "next/link";
import { Button, useToast } from "@chakra-ui/react";
import { BiCopy } from "react-icons/bi";
import QRModal from "@/components/QRModal";

interface Props {
  events: Event[];
}

const EventsTable = ({ events }: Props) => {
  const baseUrl = window.location.origin + "/register-event/";
  const tableHeaders = ["ID", "Name", "Link", "Link Copy", "Action"];
  const toast = useToast();

  if (!events) return null;

  return (
    <div>
      <table className="w-full flex-col gap-3">
        <thead className="">
          <tr className="flex justify-around px-2 py-3 w-full">
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                className="flex-1 text-center text-sm font-semibold text-[#030229]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="mt-3 w-full">
          {events.map((event, index) => (
            <tr
              key={index}
              className="bg-white rounded-md mb-3 p-3 flex justify-around items-center w-full"
            >
              <td className="flex-1 text-center text-primary text-sm">
                {event._id}
              </td>
              <td className="flex-1 text-center text-primary text-sm">
                {event.title}
              </td>
              <td className="flex-1 text-center text-blue-500 text-sm">
                <Link href={baseUrl + event.slug}>{baseUrl + event.slug}</Link>
              </td>
              <td className="flex-1 text-center text-primary text-sm">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(baseUrl + event.slug);
                    toast({
                      title: "Link copied",
                      position: "top",
                      status: "info",
                      duration: 500,
                      isClosable: true,
                    });
                  }}
                >
                  Copy <BiCopy className="ml-2" />
                </Button>
              </td>
              <td className="flex-1 text-center text-primary text-sm">
                <QRModal url={baseUrl + event.slug} label="View" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
