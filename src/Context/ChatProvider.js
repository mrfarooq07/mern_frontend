import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      history.push("/");
    }
  }, []);

  return user != "" ? (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats, notification, setNotification }}
    >
      {children}
    </ChatContext.Provider>
  ) : (
    ""
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
