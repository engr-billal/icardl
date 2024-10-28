"use client";
import { routes } from "@/misc/routes";
import { useRouter } from "next/navigation";

const DashoardPage = () => {
  const router = useRouter();
  router.push(routes.registrationsDashboard.path);
  return null;
};

export default DashoardPage;
