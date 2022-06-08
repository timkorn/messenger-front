import s from "./Messages.module.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import UniversalLoader from "../common/loader.jsx";
import ChatMessage from "../ChatMessage/ChatMessage.js";
import cn from "classnames";
import ChatContext from "../../context/ChatContext";
function Messages({ type, pin }) {
  let { typeAddMesField, chatLoad, messages } = useContext(ChatContext);

  const [person, setPerson] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const ref = useRef(null);
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
          {messages.map((item, i) => (
            <div key={item.name}>
              <ChatMessage
                name={item.user_id}
                /* pic={item.picture.ava} */
                /* rep={true} */
                key={i}
                /* element={{
                  name: "Timur",
                  message: "Hello!!!",
                }} */
              >
                {item.text}
              </ChatMessage>
            </div>
          ))}
        </>
      </div>
    );
  }
}
export default Messages;
