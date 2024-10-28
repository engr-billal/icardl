import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { HiOutlineQrcode } from "react-icons/hi";
import SuccessGIF from "@/assets/success.gif";
import Link from "next/link";
import { routes } from "@/misc/routes";

const SuccessModal = ({
  isOpen,
  onClose,
  onOpen,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent w={380} top={50} py={50}>
          {/* <ModalCloseButton /> */}
          <ModalBody className="flex items-center justify-center flex-col gap-3">
            <Image
              src={SuccessGIF}
              alt="Success GIF"
              width={200}
              className="m-[-30px]"
            />
            <h1 className="font-bold text-xl">Thanks for your registration</h1>
            <Button as={Link} href={routes.profile.path}>
              View Registrations
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SuccessModal;
