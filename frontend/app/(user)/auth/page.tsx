"use client";

import Link from "next/link";
import React, { ChangeEvent, FormEventHandler, useState } from "react";
import "react-phone-input-2/lib/style.css";
import { useAuth } from "@/contexts/AuthContext";
import {
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  useToast,
} from "@chakra-ui/react";
import { routes } from "@/misc/routes";
import { useRouter } from "next/navigation";
import { Helmet } from "react-helmet";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { UserRole } from "@/misc/enums";

export default function LoginForm() {
  const toast = useToast();
  const router = useRouter();
  const { user, login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);

  if (user) {
    return router.push(
      user.role === UserRole.Admin ? routes.dashboard.path : routes.profile.path
    );
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      toast({
        title: "Both fields are required",
        status: "warning",
        position: "top",
      });
      return;
    }
    login(credentials);
  };
  return (
    <div className="flex justify-center items-center min-h-screen overflow-y-aut0">
      <Helmet title={routes.login.title} />
      <form onSubmit={handleSubmit} className="space-y-5">
        <p className="text-[24px] font-[600] text-[#333333]">Login Now</p>

        <div className="w-full">
          <label className="font-[600] text-[12px] text-[#030229] opacity-[0.7] pb-[6px]">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="w-full relative">
          <label className="font-[600] text-[12px] text-[#030229] opacity-[0.7] pb-[6px]">
            Password
          </label>
          <InputGroup>
            <Input
              id="password"
              name="password"
              type={visible ? "text" : "password"}
              placeholder="Enter your Password"
              value={credentials.password}
              onChange={(e) => handleChange(e)}
              pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$"
            />
            <InputRightAddon
              onClick={() => setVisible((state) => !state)}
              className="cursor-pointer"
            >
              {visible ? <VscEye /> : <VscEyeClosed />}
            </InputRightAddon>
          </InputGroup>
        </div>

        <div className="flex flex-col md:flex-row md:gap-5 md:items-center">
          <Button colorScheme="blue" type="submit">
            Login
          </Button>
          <p className="font-400 md:text-[16px] mt-3 text-[12px] ">
            Or{" "}
            <Text
              as={Link}
              colorScheme="blue"
              color="blue.500"
              href={routes.register.path}
            >
              Register Now
            </Text>
          </p>
        </div>
      </form>
    </div>
  );
}
