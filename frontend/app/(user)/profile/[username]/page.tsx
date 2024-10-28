import server from "@/misc/axios";
import { PaginatedResponse, Registration, User } from "@/misc/interfaces";
import Profile from "../Profile";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { APPNAME } from "@/misc/constants";
import { AxiosError } from "axios";

const fetchUser = async (username: string, page: string = "1") => {
  try {
    const nextCookies = cookies();
    const user = await server.get<User>(`/users/${username}`, {
      headers: {
        Cookie: nextCookies.toString(),
      },
    });
    const registrations = await server.get<PaginatedResponse<Registration>>(
      `/registrations/user/`,
      {
        headers: {
          Cookie: nextCookies.toString(),
        },
        params: { page },
      }
    );
    return { user: user.data, registrations: registrations.data };
  } catch (error) {
    if (error instanceof AxiosError) console.log(error.response?.data);
    return { user: null, registrations: [] };
  }
};

interface Props {
  params: { username: string };
  searchParams: { page: string };
}

const ProfilePageDynamic = async ({
  params: { username },
  searchParams: { page },
}: Props) => {
  console.log(page);
  const { user, registrations } = await fetchUser(username, page);
  if (!user) return notFound();
  return <Profile user={user} registrations={registrations} />;
};

export default ProfilePageDynamic;

export const metadata = {
  title: "Profile - " + APPNAME,
};
