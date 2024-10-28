import EventCard from "@/components/EventCard";
import Pagination from "@/components/Pagination";
import server from "@/misc/axios";
import { Event, PaginatedResponse } from "@/misc/interfaces";
import { VStack } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import React from "react";

const fetchEvents = async (page: string = "1") => {
  console.clear();
  try {
    const nextCookies = cookies();
    const events = await server.get<PaginatedResponse<Event>>(`/events`, {
      headers: {
        Cookie: nextCookies.toString(),
      },
      params: { page },
    });

    return events.data;
  } catch (error) {
    if (error instanceof AxiosError) console.log(error.response?.data);
    return null;
  }
};

const page = async ({
  searchParams: { page },
}: {
  searchParams: { page: string };
}) => {
  const events = await fetchEvents(page);
  if (events === null)
    return (
      <div className="h-full w-full flex justify-center items-center p-5">
        <p>Something went wrong, please try again</p>
      </div>
    );

  const { docs, ...pagination } = events;
  return (
    <VStack className="gap-5">
      <h2 className="text-[24px] font-bold truncate">Events</h2>
      {docs.map((event, i) => (
        <EventCard event={event} key={i} />
      ))}
      <Pagination pagination={pagination} />
    </VStack>
  );
};

export default page;
