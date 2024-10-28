import { APPNAME } from "@/misc/constants";

export const routes = {
  welcome: { path: "/welcome", title: `Welcome - ${APPNAME}` },
  login: { path: "/auth", title: `Login - ${APPNAME}` },
  register: { path: "/auth/register", title: `Register - ${APPNAME}` },
  profile: { path: "/profile/", title: `Profile - ${APPNAME}` },
  getProfileUrl: (username: string) => `/profile/${username}`,
  registerEvent: {
    path: (id: string) => `/register-event/${id}`,
    title: `Register Event - ${APPNAME}`,
  },
  events: {
    path: "/events",
    title: `Events - ${APPNAME}`,
  },
  dashboard: { path: "/dashboard", title: `Dashboard - ${APPNAME}` },
  registrationsDashboard: {
    path: "/dashboard/registrations",
    title: `Registrations - ${APPNAME} Dasbboard`,
  },
  registrationDetailsDashboard: {
    path: (id: string) => `/dashboard/registrations/${id}`,
    title: `Registration Detail - ${APPNAME} Dasbboard`,
  },
  eventsDashboard: {
    path: "/dashboard/events",
    title: `Events - ${APPNAME} Dasbboard`,
  },
};
