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
  const [reply, setReply] = useState(false);
  const [chatRequest, setChatRequest] = useState(false);
  const [red, setRed] = useState(false);
  const [typeAddMesField, setTypeMesField] = useState(false);
  const [redMessage, setRedMessage] = useState(null);
  const createReply = (name, message) => {
    deleteRed();
    setTypeMesField("reply");
    setReply({
      name: name,
      message: message,
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
    setReply(false);
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
  const { user } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatLoad, setChatLoad] = useState(true);
  const navigate = useNavigate();
  const { chatid } = useParams();
  useEffect(() => {
    if (chatid === undefined) {
      navigate("/");
    }
    findChatMessages(chatid).then((msgs) => {
      setMessages(msgs);
      setChatLoad(false);
      console.log(msgs);
    });
    return () => {
      setChatLoad(true);
    };
    /* loadContacts(); */
  }, [chatid]);

  useEffect(() => {
    connect();
    findChatMessages(chatid).then((msgs) => {
      setMessages(msgs);
      setChatLoad(false);
      console.log(msgs);
    });
    /* loadContacts(); */
  }, []);
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
    console.log(messages);
    const newMessages = [...messages, mess];
    console.log(newMessages);
    setMessages(newMessages);
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
    if (msg.trim() !== "") {
      const message = {
        userId: user.id,
        chat_id: Number(chatid),
        text: msg,
        time: new Date(),
      };
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
  };
  return (
    <ChatContext.Provider value={contextData}>{children}</ChatContext.Provider>
  );
};
