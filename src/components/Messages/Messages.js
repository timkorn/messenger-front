import s from "./Messages.module.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import UniversalLoader from "../common/loader.jsx";
import ChatMessage from "../ChatMessage/ChatMessage.js";
import cn from "classnames";
import ChatContext from "../../context/ChatContext";
import AuthContext from "../../context/AuthContext";
import MyButton from "../MyButton";
import cross from "../img/Cross.svg";
function Messages({ type, pin }) {
  let { typeAddMesField, chatLoad, messages, chatAim, setChatAim } =
    useContext(ChatContext);
  const [person, setPerson] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { searchOpen, searchMessages } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const ref = useRef(null);
  if (chatAim) {
    setTimeout(() => {
      const el = document.getElementById(chatAim);
      el.scrollIntoView({ behavior: "smooth" });
      el.style.backgroundColor = "rgba(255, 255, 255, 0.07)";
      setTimeout(() => {
        el.style.backgroundColor = "";
      }, 3000);
      setChatAim(false);
    }, 100);
  }
  const handleClickOnReply = (id) => {
    const el = document.getElementById(id);
    el.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (!chatLoad) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [chatLoad]);

  useEffect(() => {
    if (!chatLoad) {
      if (messages.users[messages.users.length - 1].id === user.id) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }
  }, [messages.users.length]);
  if (chatLoad) {
    return <UniversalLoader size={35} />;
  } else {
    return (
      <div
        ref={ref}
        className={cn(s.root, pin && s.pin, typeAddMesField && s.reply)}
      >
        {searchOpen ? (
          <SearchMessages />
        ) : (
          messages.messages.map((item, i) => (
            <div key={item.name}>
              <ChatMessage
                user={messages.users[i]}
                message={item}
                id={item.messageId}
                key={i}
                handleReply={handleClickOnReply}
              >
                {item.text}
              </ChatMessage>
            </div>
          ))
        )}
      </div>
    );
  }
}

function SearchMessages({ open }) {
  const { searchOpen, handleCloseSearch, searchMessages } =
    useContext(ChatContext);
  return (
    <>
      <MyButton
        src={cross}
        alt="закрыть"
        className="closeModal"
        handleClick={handleCloseSearch}
      />
      {searchMessages.messages.map((item, i) => (
        <div key={item.name}>
          <ChatMessage
            user={searchMessages.users[i]}
            message={item}
            id={item.messageId}
            key={i}
            /* handleReply={handleClickOnReply} */
            search={true}
          >
            {item.text}
          </ChatMessage>
        </div>
      ))}
    </>
  );
}

export default Messages;
