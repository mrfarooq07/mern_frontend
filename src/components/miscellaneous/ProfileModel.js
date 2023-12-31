import {
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { ViewIcon } from "@chakra-ui/icons";

const ProfileModel = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children && user ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          icon={<ViewIcon />}
          display={{ base: "flex" }}
          onClick={onOpen}
        ></IconButton>
      )}

      {user && (
        <Modal size={"lg"} isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent h={"410px"}>
            <ModalHeader
              fontSize={"40px"}
              fontFamily={"Work sans"}
              display={"flex"}
              justifyContent={"center"}
            >
              {user.name}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
              display={"flex"}
              flexDir={"column"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Image
                borderRadius={"full"}
                boxSize={"150px"}
                src={!user.picture ? user.pic : user.picture}
                alt={user.name}
              />
              <Text>Email: {user.email}</Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ProfileModel;
