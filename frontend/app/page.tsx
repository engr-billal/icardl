"use client";
import { useAuth } from "@/contexts/AuthContext";
import { routes } from "@/misc/routes";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  return router.push(user ? routes.profile.path : routes.welcome.path);
}
