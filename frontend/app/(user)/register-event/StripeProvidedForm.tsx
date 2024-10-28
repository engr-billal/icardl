"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Form from "./Form";
import { Event } from "@/misc/interfaces";
const stripePromise = loadStripe("pk_test_XsjVwxBA1rTPmYFvbntwfSYh00puGyrDj7");

interface Props {
  params: { id: string };
}

const StripeProvidedForm = ({ event }: { event: Event }) => {
  return (
    <Elements stripe={stripePromise}>
      <Form event={event} />
    </Elements>
  );
};

export default StripeProvidedForm;
