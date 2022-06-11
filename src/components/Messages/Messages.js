import s from "./Messages.module.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import UniversalLoader from "../common/loader.jsx";
import ChatMessage from "../ChatMessage/ChatMessage.js";
import cn from "classnames";
import ChatContext from "../../context/ChatContext";
function Messages({ type, pin }) {
  let { typeAddMesField, chatLoad, messages, chatAim, setChatAim } =
    useContext(ChatContext);
  const [person, setPerson] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { searchOpen, searchMessages } = useContext(ChatContext);
  const ref = useRef(null);
  if (chatAim) {
    const el = document.getElementById(chatAim);
    el.scrollIntoView({ behavior: "smooth" });
    setChatAim(false);
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
  if (chatLoad) {
    return <UniversalLoader size={35} />;
  } else {
    return (
      <div
        ref={ref}
        className={cn(s.root, pin && s.pin, typeAddMesField && s.reply)}
      >
        <>
          {searchOpen
            ? searchMessages.map((item, i) => (
                <div key={item.name}>
                  <ChatMessage
                    name={item.user_id}
                    id={item.id}
                    /* pic={item.picture.ava} */
                    /* rep={true} */
                    key={item.id}
                    /* element={{
                  name: "Timur",
                  message: "Hello!!!",
                }} */
                  >
                    {item.text}
                    handleReply={handleClickOnReply}
                  </ChatMessage>
                </div>
              ))
            : messages.map((item, i) => (
                <div key={item.name}>
                  <ChatMessage
                    name={item.user_id}
                    id={item.id}
                    /* pic={item.picture.ava} */
                    /* rep={true} */
                    key={item.id}
                    /* element={{
                  name: "Timur",
                  message: "Hello!!!",
                }} */
                  >
                    {item.text}
                    handleReply={handleClickOnReply}
                  </ChatMessage>
                </div>
              ))}
        </>
      </div>
    );
  }
}
export default Messages;
