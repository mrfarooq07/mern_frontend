import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState();
  const [passowrd, setPassowrd] = useState();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const handleFormSubmit = () => {};

  return (
    <VStack spacing={"5px"}>
      <FormControl id="Email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="Password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassowrd(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button height={"1.75rem"} size={"sm"} onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={handleFormSubmit}
      >
        Login
      </Button>

      <Button
        variant={"solid"}
        colorScheme="red"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("farooq@gmail.com");
          setPassowrd("12345");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};
//x1Vb4DNwXhV2kgIS Db password
export default Login;
