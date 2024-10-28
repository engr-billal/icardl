import { routes } from "@/misc/routes";
import React, {
  ChangeEvent,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button, Flex, useDisclosure, useToast } from "@chakra-ui/react";
import Loading from "@/components/Loading";
import server from "@/misc/axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { CreatePaymentMethodData } from "@stripe/stripe-js";
import SuccessModal from "./SuccessModal";
import { Event } from "@/misc/interfaces";
import Image from "next/image";
import { MEDIABASEURL } from "@/misc/constants";
import { BiCalendar } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";

const Form = ({ event }: { event: Event }) => {
  const { user } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const disclosure = useDisclosure();

  const stripe = useStripe();
  const elements = useElements();

  if (!user) {
    return null;
  }

  const handleSubmit: MouseEventHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe) {
      toast({
        title: "Stripe is not loaded or card information is missing",
        status: "error",
        position: "top",
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements?.getElement(CardElement),
      } as CreatePaymentMethodData);

      if (error) {
        toast({
          title: error.message || "Failed to create token",
          status: "error",
          position: "top",
          isClosable: true,
        });
        setLoading(false);
        return;
      }

      // Send the token and other data to your server
      const res = await server.post("/registrations", {
        amount: event.price + 2,
        id: paymentMethod?.id,
        event: event._id,
      });

      console.log(res);

      toast({
        title: "Registration Successful",
        status: "success",
        position: "top",
        isClosable: true,
      });
      disclosure.onOpen();
    } catch (err) {
      toast({
        title: "Something went wrong, please try again",
        status: "error",
        position: "top",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <Helmet title={routes.registerEvent.title} />
      {loading ? <Loading /> : null}
      <p className="text-[30px] font-bold mt-3 mb-6 text-[#333333]">
        Register Event
      </p>

      <div className="bg-[#fff] p-[10px] rounded-xl shadow-md space-y-2  transition-all hover:scale-[1.02]">
        {event?.image && (
          <Image
            src={MEDIABASEURL + event?.image}
            alt={event.title}
            width={500}
            height={300}
            className="rounded-lg h-[200px] object-cover"
          />
        )}
        <h2 className="font-bold text-sm flex gap-2 items-center">
          <BiCalendar size={20} />
          {new Date(event.date).toDateString()}
        </h2>
        <h1 className="text-[25px] font-bold text-[#333333]">{event.title}</h1>
        <p className="text-sm">{event?.description}</p>
      </div>

      <div>
        {/* Amount */}
        <div className="space-y-2 mt-6 mb-6">
          <h1 className="text-[24px] font-[600] text-[#333333]">Amount</h1>
          <Flex justify="space-between">
            <span>Event Charges</span>
            <span>${event.price}</span>
          </Flex>
          <hr />
          <Flex justify="space-between">
            <span>Registration Charges</span>
            <span>$2</span>
          </Flex>
          <hr />
          <Flex justify="space-between" className="font-bold">
            <span>Total</span>
            <span>${event.price + 2}</span>
          </Flex>
        </div>

        {/* Stripe field */}
        <div>
          <h1 className="text-[24px] font-[600] text-[#333333] mb-2">
            Payment Information
          </h1>
          <div className="w-full bg-gray-200 rounded-lg p-3 py-5">
            <h1 className="mb-6 text-primary font-bold">Stripe Pay</h1>
            <CardElement />
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          colorScheme="blue"
          mt={5}
          className="[&:hover_svg]:translate-x-1"
        >
          Continue Registration <FaArrowRight className="ml-2 transition-all" />
        </Button>
      </div>
      <SuccessModal {...disclosure} />
    </div>
  );
};

export default Form;
