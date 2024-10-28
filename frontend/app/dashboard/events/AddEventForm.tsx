"use client";

import React, { ChangeEvent, FormEventHandler, useState } from "react";
import "react-phone-input-2/lib/style.css";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Input, Textarea, useToast } from "@chakra-ui/react";
import { Event } from "@/misc/interfaces";
import server from "@/misc/axios";
import { useRouter } from "next/navigation";

export default function AddEventForm({ onClose }: { onClose: () => void }) {
  const toast = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [event, setEvent] = useState<Event>({
    title: "",
    description: "",
    date: new Date(),
    location: "",
    price: 0,
    image: "",
    user: user?._id,
  } as Event);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEvent((prevData) => ({
      ...prevData,
      [name]: name === "date" ? new Date(value) : value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !event.title ||
      !event.description ||
      !event.date ||
      !event.location ||
      !event.price
    ) {
      toast({
        title: "Please fill required fields",
        status: "warning",
        position: "top",
      });
      return;
    }
    try {
      const res = await server.post("/events", event);
      console.log(res);
      toast({
        title: "Event Added Succesfully",
        status: "success",
        position: "top",
      });
      onClose();
      router.refresh();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full">
      <div className="w-full">
        <label className="font-[600] text-[12px] text-[#030229] opacity-[0.7] pb-[6px]">
          Event
        </label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          value={event.title}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="w-full relative">
        <label className="font-[600] text-[12px] text-[#030229] opacity-[0.7] pb-[6px]">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          placeholder="Event description..."
          value={event.description}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="w-full">
        <label className="font-[600] text-[12px] text-[#030229] opacity-[0.7] pb-[6px]">
          Price
        </label>
        <Input
          id="price"
          name="price"
          type="number"
          placeholder="Price"
          value={event.price}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="w-full">
        <label className="font-[600] text-[12px] text-[#030229] opacity-[0.7] pb-[6px]">
          Date
        </label>
        <Input
          id="date"
          name="date"
          type="date"
          placeholder="Date"
          value={
            event.date.getFullYear().toString() +
            "-" +
            (event.date.getMonth() + 1).toString().padStart(2, "0") +
            "-" +
            event.date.getDate().toString().padStart(2, "0")
          }
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="w-full">
        <label className="font-[600] text-[12px] text-[#030229] opacity-[0.7] pb-[6px]">
          Location
        </label>
        <Input
          id="location"
          name="location"
          type="text"
          placeholder="Location"
          value={event.location}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <Button colorScheme="blue" type="submit" className="w-full">
        {loading ? "Adding..." : "Add Event"}
      </Button>
    </form>
  );
}
