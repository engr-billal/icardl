"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import ScanQR from "./ScanQR";
import { BiCopy } from "react-icons/bi";

const QRModal = ({ url, label }: { url: string; label: string }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>{label}</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={380} top={50} py={50}>
          <ModalCloseButton />
          <ModalBody className="flex flex-col items-center">
            <ScanQR value={url} />
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(url);
                toast({
                  title: "Link copied",
                  position: "top",
                  status: "info",
                  duration: 500,
                  isClosable: true,
                });
              }}
            >
              Copy <BiCopy className="ml-2" />
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QRModal;
