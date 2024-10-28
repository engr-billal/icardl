import EventCard from "@/components/EventCard";
import Pagination from "@/components/Pagination";
import { MEDIABASEURL } from "@/misc/constants";
import { RegistrationStatus } from "@/misc/enums";
import { PaginatedResponse, Registration, User } from "@/misc/interfaces";
import { routes } from "@/misc/routes";
import { Avatar, Badge, Box, Button, Flex, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiCalendar } from "react-icons/bi";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const Profile = ({
  user,
  registrations: { docs, ...pagination },
}: {
  user: User;
  registrations: PaginatedResponse<Registration>;
}) => {
  return (
    <div className="w-full bg-[#f8f8f8]">
      {/* Head */}
      <Box className="relative rounded-[24px] bg-white p-[24px] overflow-hidden transition-all hover:scale-[1.02]">
        <VStack alignItems="center" className="gap-3">
          <Avatar
            boxSize={82}
            name={user.firstname + " " + user?.lastname}
            src={MEDIABASEURL + user.image || ""}
          />
          <h2 className="text-[24px] font-bold truncate">
            {user.firstname + " " + user.lastname}
          </h2>
          <Link
            href={`mailto:${user.email}`}
            className="flex items-center gap-[5px] text-[#8d8d8d] truncate text-[12px]"
          >
            <FaEnvelope />
            {user.email}
          </Link>
          <Link
            href={`tel:${user.phone}`}
            className="flex items-center gap-[5px] text-[#8d8d8d] truncate text-[12px]"
          >
            <FaPhoneAlt />
            {user.phone}
          </Link>
        </VStack>
        <Flex gap={2} mt={5}>
          <Button
            as={Link}
            href={routes.events.path}
            w="100%"
            colorScheme="green"
          >
            Explore Events
          </Button>
        </Flex>
      </Box>
      <VStack className="gap-10 mt-6 relative transition-all">
        <h2 className="text-[24px] font-bold truncate rounded-xl bg-white p-3 w-full text-center">
          Registrations
        </h2>
        {pagination.totalDocs > 0 ? (
          docs.map((reg, i) => (
            <EventCard
              event={reg.event}
              registration={reg}
              key={i}
              link={false}
            />
          ))
        ) : (
          <Link href={routes.events.path} className="text-center">
            No registrations! Explore event to register
          </Link>
        )}
        <Pagination pagination={pagination} />
      </VStack>
    </div>
  );
};

export default Profile;
