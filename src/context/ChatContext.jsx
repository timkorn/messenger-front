import { createContext, useState, useContext, useEffect } from "react";
import AuthContext from "./AuthContext.jsx";
import jwt_decode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import {
  getUsers,
  countNewMessages,
  findChatMessages,
  findChatMessage,
} from "../utils/ApiUtil.js";
const ChatContext = createContext();
export default ChatContext;
var stompClient = null;
export const ChatProvider = ({ children }) => {
  const [reply, setReply] = useState(null);
  const [chatRequest, setChatRequest] = useState(false);
  const [red, setRed] = useState(false);
  const [typeAddMesField, setTypeMesField] = useState(false);
  const [redMessage, setRedMessage] = useState(null);
  const { user } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState({ messages: [], users: [] });
  const [chatLoad, setChatLoad] = useState(true);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const { chatid } = useParams();
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [searchMessages, setSearchMessages] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [chatAim, setChatAim] = useState(null);
  const [searchError, setSearchError] = useState("");
  useEffect(() => {
    if (!searchOpen) {
      setSearchMessages([]);
    }
  }, [searchOpen]);
  const handleMakeSearch = (value) => {
    let users = [];
    let serMess = messages.messages.filter((item, i) => {
      if (
        messages.users[i].username.indexOf(value) !== -1 ||
        item.text.indexOf(value) !== -1
      ) {
        users.push(messages.users[i]);
        return true;
      } else {
        return false;
      }
    });
    if (serMess.length === 0) {
      setSearchError("Нет подходящих сообщений");
    } else {
      handleOpenSearch({ messages: serMess, users: users });
    }
  };

  const handleOpenSearch = (msg) => {
    setSearchMessages(msg);
    setSearchOpen(true);
  };
  const handleCloseSearch = (id) => {
    setSearchMessages([]);
    setSearchOpen(false);
    if (id !== false) {
      setChatAim(id);
    }
  };
  async function showChats(type) {
    let response = await fetch("http://localhost:8080/chat/showChats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(authTokens.accessToken),
      },
      body: JSON.stringify({ id: user.id, chat_type: type }),
    });
    let result = await response.json();
    if (type === "PERSONAL") {
      for (let i = 0; i < result.chats.length; i++) {
        let people = result.chats[i].participants.split(" ");
        let names = result.chats[i].name.split(",");
        let images = result.chats[i].ava.split(" ");
        console.log("Images:", images);
        let me, other;
        people[0] = Number(people[0]);
        people[1] = Number(people[1]);
        if (people[0] == user.id) {
          me = people[0];
          other = people[1];
        } else {
          me = people[1];
          other = people[0];
        }
        if (me < other) {
          result.chats[i].ava = images[1];
          result.chats[i].name = names[1];
        } else {
          result.chats[i].ava = images[0];
          result.chats[i].name = names[0];
        }
      }
    }
    if (response.status === 200) {
      console.log(result);
      setChats(result);
      return result;
    } else if (result.error === "Unauthorized") {
      logoutUser();
    } else {
      throw new Error();
    }
  }
  const createReply = (name, message, rep_id) => {
    deleteRed();
    setTypeMesField("reply");
    setReply({
      name: name,
      message: message,
      id: rep_id,
    });
  };
  const createRed = (name, message) => {
    deleteReply();
    setTypeMesField("red");
    setRedMessage(message);
    setRed({
      name: name,
      message: message,
    });
  };
  const deleteRed = () => {
    setRed(false);
    setTypeMesField(false);
    setRedMessage(false);
  };
  const deleteReply = () => {
    setReply(null);
    setTypeMesField(false);
  };
  const createPinRequest = (element) => {
    setChatRequest(element);
  };
  const deletePin = (id) => {};
  const deletePinRequest = (element) => {
    setChatRequest(false);
  };
  const makeNewPin = (id, mesId) => {
    setChatRequest(false);
  };
  const clean = () => {
    deleteReply();
  };
  useEffect(() => {
    if (chatid === undefined) {
      navigate("/");
    }
    console.log();
    if (chatid !== "start") {
      connect();
      findChatMessages(chatid).then((msgs) => {
        setMessages(msgs);
        setChatLoad(false);
        sessionStorage.setItem("chat", JSON.stringify(msgs));
      });
    }
    return () => {
      setChatLoad(true);
      if (stompClient !== null) {
        stompClient.disconnect(disconnected, {});
      }
      clean();
    };
    /* loadContacts(); */
  }, [chatid]);
  const disconnected = () => {
    console.log("Disconnected");
  };
  /*  useEffect(() => {
    connect();
    findChatMessages(chatid).then((msgs) => {
      setMessages(msgs);
      setChatLoad(false);
      console.log(msgs);
    });
  }, []); */
  const connect = () => {
    var sockJS = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(sockJS);
    stompClient.connect({ id: user.id }, onConnected, onError);
  };

  const onConnected = () => {
    console.log("connected");
    stompClient.subscribe(
      "/user/" + chatid + "/queue/messages",
      onMessageReceived
    );
  };

  const onError = (err) => {
    console.log(err);
  };

  const onMessageReceived = (msg) => {
    const mess = JSON.parse(msg.body);
    let mess1 = JSON.parse(sessionStorage.getItem("chat"));
    console.log(mess);
    const newMessages = {
      messages: [...mess1.messages, mess.message],
      users: [...mess1.users, mess.user],
    };
    setMessages(newMessages);
    sessionStorage.setItem("chat", JSON.stringify(newMessages));
    /* if (active.id === notification.senderId) {
      findChatMessage(notification.id).then((message) => {
        const newMessages = JSON.parse(
          sessionStorage.getItem("recoil-persist")
        ).chatMessages;
        newMessages.push(message);
        setMessages(newMessages);
      });
    } else {
        message.info("Received a new message from " + notification.senderName); 
    } */
    loadContacts();
  };

  const sendMessage = (msg) => {
    let date = new Date();
    let day = String(date.getDay());
    let month = String(date.getMonth());
    let hour = String(date.getHours());
    let minute = String(date.getMinutes());
    if (msg.trim() !== "") {
      let message = {
        user_id: user.id,
        chat_id: Number(chatid),
        text: msg,
        time: day + "." + month + " " + hour + ":" + minute,
        media: {
          id: 1,
          content: false,
          chat_id: 1,
        },
      };
      if (reply) {
        message.ref = reply.id;
      }
      console.log("send mes", message);
      stompClient.send("/app/chat", {}, JSON.stringify(message));
    }
  };

  const loadContacts = () => {
    const promise = getUsers().then((users) =>
      users.map((contact) =>
        countNewMessages(contact.id, user.id).then((count) => {
          contact.newMessages = count;
          return contact;
        })
      )
    );

    /*  promise.then((promises) =>
      Promise.all(promises).then((users) => {
        setContacts(users);
         if (activeContact === undefined && users.length > 0) {
          setActiveContact(users[0]);
        }
      })
    );  */
  };
  let contextData = {
    createReply,
    deleteReply,
    reply,
    createPinRequest,
    chatRequest,
    deletePinRequest,
    makeNewPin,
    deletePin,
    red,
    deleteRed,
    createRed,
    typeAddMesField,
    redMessage,
    sendMessage,
    messages,
    chatLoad,
    chatid,
    showChats,
    chats,
    chatAim,
    setChatAim,
    searchMessages,
    handleOpenSearch,
    handleCloseSearch,
    handleMakeSearch,
    searchError,
    setSearchOpen,
    setSearchError,
    searchOpen,
  };
  return (
    <ChatContext.Provider value={contextData}>{children}</ChatContext.Provider>
  );
};
