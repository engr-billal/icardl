"use client";
import { useAuth } from "@/contexts/AuthContext";
import { routes } from "@/misc/routes";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { user } = useAuth();
  const router = useRouter();
  return router.push(routes.profile.path + user?.username);
};

export default ProfilePage;
