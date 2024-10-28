import H1 from "@/components/H1";
import server from "@/misc/axios";
import { getStatusColor } from "@/misc/getStatusColor";
import { Registration } from "@/misc/interfaces";
import { Badge, Button } from "@chakra-ui/react";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { BiPrinter } from "react-icons/bi";
import RegistrationDetails from "./RegistrationDetails";

const fetchRegistration = async (id: string) => {
  try {
    const nextCookies = cookies();
    const res = await server.get<Registration>("/registrations/" + id, {
      headers: {
        Cookie: nextCookies.toString(),
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const EventDetailsDashboard = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const registration = await fetchRegistration(id);
  if (!registration) return notFound();
  return (
    <div>
      <H1>{registration.user.firstname + " " + registration.user.lastname}</H1>
      <RegistrationDetails registration={registration} />
    </div>
  );
};

export default EventDetailsDashboard;
