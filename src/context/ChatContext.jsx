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
  const [searchValue, setSearchValue] = useState(null);
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
  const [pin, setPin] = useState(false);
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
      setSearchValue(value);
      handleOpenSearch({ messages: serMess, users: users });
    }
  };

  const handleOpenSearch = (msg) => {
    setSearchMessages(msg);
    setSearchOpen(true);
  };
  const handleCloseSearch = (id) => {
    setSearchValue(null);
    setSearchMessages([]);
    setSearchOpen(false);
    setSearchError("");
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
  const deletePin = (event) => {
    event.stopPropagation();
    DelPin();
    setPin(false);
  };
  const deletePinRequest = () => {
    setChatRequest(false);
  };
  const makeNewPin = () => {
    makePin();
    setPin(chatRequest);
    deletePinRequest();
  };
  const makePin = async () => {
    let response = await fetch("http://localhost:8080/chat/pinned", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(authTokens.accessToken),
      },
      body: JSON.stringify({
        message: chatRequest.message.messageId,
        chat_id: chatid,
      }),
    });
    let result = await response.json();
    if (response.status === 200 && result) {
      return true;
    } else if (result.error === "Unauthorized") {
      logoutUser();
    } else {
      throw new Error();
    }
  };
  const DelPin = async () => {
    let response = await fetch("http://localhost:8080/chat/dePinned", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(authTokens.accessToken),
      },
      body: JSON.stringify({ id: chatid }),
    });
    let result = await response.json();
    if (response.status === 200 && result) {
      return true;
    } else if (result.error === "Unauthorized") {
      logoutUser();
    } else {
      throw new Error();
    }
  };
  const clean = () => {
    deleteReply();
    deletePinRequest();
  };
  useEffect(() => {
    if (chatid === undefined) {
      navigate("/");
    }

    if (chatid !== "start") {
      connect();
      findChatMessages(chatid).then((msgs) => {
        setMessages(msgs);
        setChatLoad(false);
        sessionStorage.setItem("chat", JSON.stringify(msgs));
        processPin(msgs);
      });
    }
    return () => {
      setChatLoad(true);
      if (stompClient !== null) {
        stompClient.disconnect(disconnected, {});
      }
      /* if (chatid !== "start") {
        setChats([]);
      } */
      clean();
    };
    /* loadContacts(); */
  }, [chatid]);
  const processPin = (msgs) => {
    let m;
    for (let i = 0; i < msgs.messages.length; i++) {
      if (msgs.messages[i].fixed === true) {
        m = { message: msgs.messages[i], user: msgs.users[i] };
      }
    }
    setPin(m);
  };
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
    stompClient.activate();
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

  const sendMessage = (msg, media) => {
    let subbed = new Date();
    let hour =
      subbed.getHours().toString().length < 2
        ? "0" + subbed.getHours()
        : subbed.getHours();
    let min =
      subbed.getMinutes().toString().length < 2
        ? "0" + subbed.getMinutes()
        : subbed.getMinutes();
    let correct_date = `${hour}:${min}`;
    if (msg.trim() !== "" || media !== -1) {
      let message = {
        user_id: user.id,
        chat_id: Number(chatid),
        text: msg,
        time: correct_date,
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
    searchValue,
    pin,
  };
  return (
    <ChatContext.Provider value={contextData}>{children}</ChatContext.Provider>
  );
};
