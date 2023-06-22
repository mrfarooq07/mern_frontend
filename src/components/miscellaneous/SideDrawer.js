import { Box, Button, Tooltip } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

export const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  return (
    <>
      <Box>
        <Tooltip label="Search user to chat" hasArrow placement="bottom">
          <Button variant="ghost">
            <i className="fas fa-search"></i>
          </Button>
        </Tooltip>
      </Box>
    </>
  );
};
