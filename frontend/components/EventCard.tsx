import { MEDIABASEURL } from "@/misc/constants";
import { RegistrationStatus } from "@/misc/enums";
import { getStatusColor } from "@/misc/getStatusColor";
import { Event, Registration } from "@/misc/interfaces";
import { routes } from "@/misc/routes";
import { Badge, Box, Button, Flex, Wrap } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { BiCalendar, BiDollar } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";

const EventCard = ({
  event,
  link = true,
  registration,
}: {
  event: Event;
  link?: boolean;
  registration?: Registration;
}) => {
  return (
    <Box
      {...(link
        ? { as: Link, href: routes.registerEvent.path(event.slug as string) }
        : {})}
      className="bg-white p-[10px] rounded-xl space-y-3  transition-all hover:scale-[1.02] w-full"
    >
      {event?.image && (
        <Image
          src={MEDIABASEURL + event?.image}
          alt={event.title}
          width={500}
          height={300}
          className="rounded-lg h-[200px] object-cover"
        />
      )}
      <h1 className="text-[25px] font-bold text-[#333333] leading-[1.2em]">
        {event.title}
      </h1>
      <p>{event.description}</p>
      <h2 className="text-sm flex gap-2 items-center">
        <BiCalendar size={20} />
        {new Date(event.date).toDateString()}
      </h2>
      <h2 className="text-sm flex gap-2 items-center">
        <FaMapMarkerAlt size={20} />
        {event.location}
      </h2>
      <h2 className="text-sm flex gap-2 items-center">
        <BiDollar size={20} />
        {event.price}$
      </h2>
      {link && <Button w="100%">Register</Button>}
      {registration && (
        <Flex>
          Booking:
          <Badge
            className="!px-2 py-1 !rounded-md ml-2"
            colorScheme={getStatusColor(registration.status)}
          >
            {registration.status}
          </Badge>
        </Flex>
      )}
    </Box>
  );
};

export default EventCard;
