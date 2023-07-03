import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  // Spinner,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModel from "./ProfileModel";
import { useHistory } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/hooks";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { Spinner } from "@chakra-ui/spinner";
export const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  var userInfo = user;
  if (userInfo !== undefined) {
    const logoutHandler = () => {
      localStorage.removeItem("userInfo");
      history.push("/");
    };

    const handleSearch = async () => {
      if (!search) {
        toast({
          title: "Please enter something to search",
          status: "warning",
          duration: 2000,
          isClosable: true,
          position: "top-left",
        });
        return;
      }

      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get(`/api/user/?search=${search}`, config);
        setLoading(false);
        setSearchResults(data);
      } catch (error) {
        toast({
          title: "Error: Failed to load the search",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    };

    const accessChat = async (userId) => {
      try {
        setLoadingChat(true);
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.post("/api/chat", { userId }, config);
        if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
        setSelectedChat(data);
        setLoadingChat(false);
        onClose();
      } catch (error) {
        toast({
          title: "Error fetching the chat",
          description: error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    };

    return (
      <>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          bg={"white"}
          w={"100%"}
          p={"5px 10px 5px 10px"}
          borderWidth={"5px"}
        >
          <Tooltip label="Search user to chat" hasArrow placement="bottom">
            <Button variant="ghost" onClick={onOpen}>
              <i className="fas fa-search"></i>
              <Text display={{ base: "none", md: "flex" }} px={"4"}>
                Search user
              </Text>
            </Button>
          </Tooltip>
          <Text fontSize={"2xl"} fontFamily={"Work sans"}>
            Mern Chat App
          </Text>
          <div>
            <Menu>
              <MenuButton p={1}>
                <BellIcon fontSize={"2xl"} m={1} />
              </MenuButton>
              {/* <MenuList></MenuList> */}
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon></ChevronDownIcon>}
              >
                <Avatar
                  size={"sm"}
                  cursor={"pointer"}
                  name={userInfo && userInfo.name}
                  src={userInfo && userInfo.pic}
                ></Avatar>
              </MenuButton>
              <MenuList>
                <ProfileModel user={userInfo}>
                  {/* <MenuItem>My profile</MenuItem> */}
                </ProfileModel>
                <MenuDivider></MenuDivider>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </Box>

        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth={"1px"}>Search users</DrawerHeader>
            <DrawerBody>
              <Box display={"flex"} pb={2}>
                <Input
                  placeholder="Search by name or email"
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={handleSearch}>Go</Button>
              </Box>
              {loading ? (
                <ChatLoading />
              ) : (
                searchResults?.map((userData) => (
                  <UserListItem
                    key={userData._id}
                    user={userData}
                    handleFunction={() => accessChat(userData._id)}
                  />
                ))
              )}
              {loadingChat && (
                <Spinner ml={"auto"} display={"flex"} color="black" />
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
};
