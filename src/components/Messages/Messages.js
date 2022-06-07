import s from "./Messages.module.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import UniversalLoader from "../common/loader.jsx";
import ChatMessage from "../ChatMessage/ChatMessage.js";
import cn from "classnames";
import ChatContext from "../../context/ChatContext";
function Messages({ type, pin }) {
  let { typeAddMesField } = useContext(ChatContext);
  const [person, setPerson] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const ref = useRef(null);
  useEffect(() => {
    async function fetchData() {
      const url = "https://api.randomuser.me/?results=2";
      const response = await fetch(url);
      const data = await response.json();
      setPerson(data.results);
      setLoading(false);
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (!isLoading) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [isLoading]);
  if (isLoading || !person) {
    return <UniversalLoader size={35} />;
  } else {
    return (
      <div
        ref={ref}
        className={cn(s.root, pin && s.pin, typeAddMesField && s.reply)}
      >
        <>
          {person.map((item, i) => (
            <div key={item.name}>
              <ChatMessage
                name={item.name.first}
                pic={item.picture.large}
                rep={true}
                key={i}
                element={{
                  name: "Timur",
                  message: "Hello!!!",
                }}
              >
                {i}
              </ChatMessage>
            </div>
          ))}
        </>
      </div>
    );
  }
}
export default Messages;
