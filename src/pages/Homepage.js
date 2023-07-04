import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router-dom";

const Homepage = () => {
  const history = useHistory();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (userInfo !== null) {
    history.push("/chats");
    console.log(userInfo, "userInfo");
  }
  // useEffect(() => {

  // }, []);
  return (
    <Container maxH="xl" centerContent>
      <Box
        display={"flex"}
        p={3}
        bg={"white"}
        w={"100%"}
        m={"40px 0 15px 0"}
        borderRadius={"lg"}
        borderWidth={"1px"}
        justifyContent={"center"}
      >
        <Text fontSize={"4xl"} fontFamily={"Work Sans"}>
          Welcome to Chat App
        </Text>
      </Box>
      <Box
        bg={"white"}
        width={"100%"}
        p={"4"}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Tabs variant="soft-rounded">
          <TabList mb={"1em"}>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
