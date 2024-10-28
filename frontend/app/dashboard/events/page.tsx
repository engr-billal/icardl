import React from "react";
import server from "@/misc/axios";
import H1 from "@/components/H1";
import { PaginatedResponse, PaginationData, Event } from "@/misc/interfaces";
import { cookies } from "next/headers";
import Pagination from "@/components/Pagination";
import EventsTable from "./EventsTable";
import { Button } from "@chakra-ui/react";
import AddEventModal from "./AddEventModel";

const fetchOrders = async (page: string) => {
  try {
    const nextCookies = cookies();
    const res = await server.get<PaginatedResponse<Event>>("/events", {
      headers: {
        Cookie: nextCookies.toString(),
      },
      params: { page },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return { docs: [] };
  }
};

const RegistrationsDashboard = async ({
  searchParams: { page },
}: {
  searchParams: { page: string };
}) => {
  const { docs, ...pagination } = await fetchOrders(page);

  return (
    <div>
      <div className="flex items-center justify-between">
        <H1>All Events</H1>
        <AddEventModal />
      </div>
      <EventsTable events={docs || []} />
      {(pagination as PaginationData)?.totalDocs && (
        <Pagination pagination={pagination as PaginationData} />
      )}
    </div>
  );
};

export default RegistrationsDashboard;
