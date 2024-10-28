import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { cookies } from "next/headers";
import { Event } from "@/misc/interfaces";
import server from "@/misc/axios";
import StripeProvidedForm from "../StripeProvidedForm";
import { notFound } from "next/navigation";

const fetchEvent = async (slug: string) => {
  try {
    const nextCookies = cookies();
    const res = await server.get<Event>(`/events/${slug}`, {
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

interface Props {
  params: { slug: string };
}

const EventRegistrationPage = async ({ params: { slug } }: Props) => {
  const event = await fetchEvent(slug);
  if (event === null) return notFound();

  return <StripeProvidedForm event={event} />;
};

export default EventRegistrationPage;
