"use client";
import { getStatusColor } from "@/misc/getStatusColor";
import { Registration } from "@/misc/interfaces";
import { Badge, Button } from "@chakra-ui/react";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { BiPrinter } from "react-icons/bi";

const RegistrationDetails = ({
  registration,
}: {
  registration: Registration;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const data = {
    Name: registration.user.firstname + " " + registration.user.lastname,
    Phone: registration.user.phone,
    Email: registration.user.email,
    Address: registration.user.address,
    Timestamp: new Date(registration.timeStamp).toDateString(),
    Status: (
      <Badge
        rounded={100}
        px={3}
        className="py-1 rounded-full"
        colorScheme={getStatusColor(registration.status)}
      >
        {registration.status}
      </Badge>
    ),
    Transaction: registration.transactionId,
  };
  return (
    <>
      <div className="grid grid-cols-3 gap-5 print:p-5" ref={ref}>
        {Object.keys(data).map((key, i) => (
          <div
            key={i}
            className="space-y-3 p-5 rounded-xl border border-gray-200 bg-white"
          >
            <h1 className="text-[19px] font-semibold text-[#333333] leading-[1.2em]">
              {key}
            </h1>
            <h3 className="text-[16px] leading-[1.2em]">
              {data[key as keyof typeof data]}
            </h3>
          </div>
        ))}
      </div>
      <ReactToPrint
        trigger={() => (
          <Button
            colorScheme="blue"
            w="100%"
            mt={5}
            onClick={() => window.print()}
          >
            <BiPrinter size={20} /> Print Card
          </Button>
        )}
        content={() => ref.current}
      />
    </>
  );
};

export default RegistrationDetails;
