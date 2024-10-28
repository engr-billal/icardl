"use client";

import Link from "next/link";
import React, { ChangeEvent, FormEventHandler, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { HiCalendarDays } from "react-icons/hi2";
import { routes } from "@/misc/routes";
import { RegistrationDetails, User } from "@/misc/interfaces";
import { UserRole } from "@/misc/enums";
import {
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  Switch,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "@/contexts/AuthContext";
import { Helmet } from "react-helmet";
import { APPNAME } from "@/misc/constants";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

export default function RegisterForm() {
  const toast = useToast();
  const { user, register } = useAuth();
  const gradeLevels = ["Freshman", "Sophomore", "Junior", "Senior"];
  const fraternityTypes = ["SAE", "ΑΦΑ", "ΚΣ", "ΔΚΕ", "ΦΔΘ", "ΠΚΑ", "ΒΘΠ"];
  const [credentials, setcredentials] = useState<RegistrationDetails>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    dob: new Date(),
    address: "",
    password: "",
    role: UserRole.Customer,
  });
  const [visible, setVisible] = useState(false);

  console.log(credentials);
  const [agreement, setAgreement] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setcredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!agreement) {
      toast({
        title: "Please agree to our policies",
        status: "warning",
        isClosable: true,
        position: "top",
      });
      return;
    }
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(credentials.password)) {
      toast({
        title:
          "Password must be at least 8 characters long, and include a mix of letters, numbers, and symbols.",
        status: "warning",
        position: "top",
      });
      return;
    }
    register(credentials);
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Helmet title={`Register - ${APPNAME}`} />
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="mt-3 mb-6 flex ">
          <p className="text-[24px] font-[600] text-[#333333]">Register Now</p>
        </div>

        <div className=" w-full">
          <label className="font-[600] text-[12px] text-[#030229] opacity-[0.7] pb-[6px]">
            First Name
          </label>
          <Input
            id="firstname"
            name="firstname"
            type="text"
            placeholder="First Name"
            value={credentials.firstname}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div className=" w-full">
          <label className="font-[600] text-[12px] text-[#030229] opacity-[0.7] pb-[6px]">
            Last Name
          </label>
          <Input
            id="lastname"
            name="lastname"
            type="text"
            placeholder="Last Name"
            value={credentials.lastname}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="w-full">
          <label className="font-[600] text-[12px] text-[#030229] opacity-[0.7] pb-[6px]">
            Phone Number
          </label>
          <PhoneInput
            country={"us"}
            value={credentials.phone}
            onChange={(phone) => {
              console.log("Phone", phone);
              setcredentials({ ...credentials, phone });
            }}
            inputStyle={{
              height: "40px",
              width: "100%",
              fontSize: "16px",
              backgroundColor: "#FAFAFB",
              lineHeight: "24px",
              fontWeight: 400,
              color: "black",
              borderColor: "#0000001A",
              borderWidth: "1px",
              borderStyle: "solid",
              borderRadius: "0.37rem",
              paddingLeft: "50px", // Adjust this to match the width of the country code dropdown
              boxSizing: "border-box",
            }}
            buttonStyle={{
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#0000001A",
              height: "40px",
            }}
            containerStyle={{
              width: "100%",
            }}
          />
        </div>

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
            required
          />
        </div>

        <div className="w-full relative">
          <label className="font-[600] text-[12px] text-[#030229] opacity-[0.7] pb-[6px]">
            Date Of Birth
          </label>
          <Input
            className="pl-9 h-[56px] w-full text-[16px] bg-[#FAFAFB] leading-[24px] font-400 text-black outline-none border-[#0000001A] border border-solid appearance-none rounded-[10px] lg:w-full py-2 px-3  "
            id="dob"
            name="dob"
            type="date"
            placeholder="Enter Your Date of Birth"
            value={(() => {
              // Example: Mon Aug 12 2024 00:00:00 GMT+0000 (UTC)
              const date = new Date(credentials.dob);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              return `${year}-${month}-${day}`;
            })()}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div className="w-full">
          <label className="font-[600] text-[12px] text-[#030229] opacity-[0.7] pb-[6px]">
            Address
          </label>
          <Textarea
            id="address"
            name="address"
            placeholder="Address"
            value={credentials.address}
            onChange={(e) => handleChange(e as any)}
            required
          />
        </div>

        <div className="w-full">
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
              required
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

        <span className="text-sm text-gray-400">
          Use 8 or more alphanumeric characters (atleast 1 capital) & symbols
        </span>

        <div className="flex gap-2 items-start mt-[30px]">
          <Switch
            onChange={(e) => setAgreement(e.target.checked)}
            required
            colorScheme="green"
          />
          <p className=" md:text-[12px] text-[12px] -mt-2">
            By creating an account, I agree to our Terms of use and Privacy
            Policy{" "}
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:gap-5 md:items-center">
          <Button type="submit" colorScheme="blue">
            Register
          </Button>
          <p className="font-400 md:text-[16px] mt-3 text-[12px] ">
            Or{" "}
            <Text
              as={Link}
              colorScheme="blue"
              color="blue.500"
              href={routes.login.path}
            >
              Login Here
            </Text>
          </p>
        </div>
      </form>
    </div>
  );
}
