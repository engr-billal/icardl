"use client";

import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/misc/enums";
import { notFound } from "next/navigation";

const CheckAdmin = () => {
  const { user } = useAuth();
  if (user?.role !== UserRole.Admin) return notFound();
};

export default CheckAdmin;
