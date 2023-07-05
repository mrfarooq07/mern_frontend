import React from "react";
import { ChatState } from "../Context/ChatProvider";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModel from "./miscellaneous/ProfileModel";
import UpdateGroupNameModal from "./miscellaneous/UpdateGroupNameModal";
import { useState } from "react";
import axios from "axios";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoadinf] = useState(false);
  const [newMessages, setNewMessages] = useState();
  const { user, selectedChat, setSelectedChat } = ChatState();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const toast = useToast();

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessages) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessages,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data);
        setNewMessages("");
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Unable to send the message",
          description: error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
  };
  const typingHandler = async (e) => {
    setNewMessages(e.target.value);
    // typing indicator logic here
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w={"100%"}
            fontFamily={"Work sans"}
            display={"flex"}
            justifyContent={{ base: "space-between" }}
            alignItems={"center"}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            ></IconButton>
            {!selectedChat.isGroupChat ? (
              <>
                {console.log(getSenderFull(user, selectedChat.users))}
                {getSender(user, selectedChat.users)}
                <ProfileModel user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                {
                  <UpdateGroupNameModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                }
              </>
            )}
          </Text>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-end"}
            p={3}
            bg={"#E8E8E8"}
            width={"100%"}
            h={"100%"}
            borderRadius={"lg"}
            overflow={"hidden"}
          >
            {loading ? (
              <Spinner
                size={"xl"}
                w={20}
                h={20}
                alignSelf={"center"}
                margin={"auto"}
              />
            ) : (
              <div>{}</div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                variant={"filled"}
                bg={"#E0E0E0"}
                placeholder="Write a message..."
                onChange={typingHandler}
                value={newMessages}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
        >
          <Text fontSize={"3xl"} pb={3} fontFamily={"Work sans"}>
            Click on a user to start chat
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
