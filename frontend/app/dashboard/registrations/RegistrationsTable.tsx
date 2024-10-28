"use client";
import React from "react";
import { Registration } from "@/misc/interfaces";
import { MdCalendarMonth } from "react-icons/md";
import { Badge } from "@chakra-ui/react";
import { BiPrinter } from "react-icons/bi";
import { getStatusColor } from "@/misc/getStatusColor";
import Link from "next/link";
import { routes } from "@/misc/routes";
import RegistrationDetails from "./[id]/RegistrationDetails";

interface Props {
  registrations: Registration[];
}

const RegistrationsTable = ({ registrations }: Props) => {
  const tableHeaders = [
    "Registration ID",
    "Name",
    "Timestamp",
    "Status",
    "Action",
  ];

  if (!registrations) return null;

  return (
    <div>
      <table className="w-full flex-col gap-3">
        <thead className="">
          <tr className="flex justify-around px-2 py-3 w-full">
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                className="text-sm text-left font-semibold text-[#030229]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="mt-3 w-full">
          {registrations.map((registration, index) => (
            <tr
              key={index}
              className="bg-white rounded-md mb-3 p-3 flex justify-around items-center w-full"
            >
              <td className="text-primary text-sm">
                <Link
                  href={routes.registrationDetailsDashboard.path(
                    registration._id
                  )}
                >
                  {registration._id}{" "}
                </Link>
              </td>
              <td className="text-primary text-sm">
                <Link
                  href={routes.registrationDetailsDashboard.path(
                    registration._id
                  )}
                >
                  {registration.user.firstname +
                    " " +
                    registration.user?.lastname}
                </Link>
              </td>
              <td className="text-primary text-sm">
                <Link
                  className="flex items-center gap-2"
                  href={routes.registrationDetailsDashboard.path(
                    registration._id
                  )}
                >
                  <MdCalendarMonth />
                  {new Date(registration.timeStamp).toDateString()}
                </Link>
              </td>
              <td className="text-primary text-sm">
                <Badge
                  rounded={100}
                  px={3}
                  className="py-1 rounded-full"
                  colorScheme={getStatusColor(registration.status)}
                >
                  {registration.status}
                </Badge>
              </td>
              <td className="text-primary text-sm [&_.grid]:hidden [&_.grid]:print:grid">
                <RegistrationDetails registration={registration} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationsTable;
