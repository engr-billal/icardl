import React from "react";
import server from "@/misc/axios";
import H1 from "@/components/H1";
import {
  PaginatedResponse,
  PaginationData,
  Registration,
} from "@/misc/interfaces";
import { cookies } from "next/headers";
import Pagination from "@/components/Pagination";
import RegistrationsTable from "./RegistrationsTable";

const fetchRegistrations = async (page: string) => {
  try {
    const nextCookies = cookies();
    const res = await server.get<PaginatedResponse<Registration>>(
      "/registrations",
      {
        headers: {
          Cookie: nextCookies.toString(),
        },
        params: { page },
      }
    );
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
  const { docs, ...pagination } = await fetchRegistrations(page);

  return (
    <div>
      <H1>Card Requests</H1>
      <RegistrationsTable registrations={docs || []} />
      {(pagination as PaginationData)?.totalDocs && (
        <Pagination pagination={pagination as PaginationData} />
      )}
    </div>
  );
};

export default RegistrationsDashboard;
