import React, { useContext, useEffect, useState } from "react";
import UniversalLoader from "../common/loader.jsx";
import search from "../img/search.svg";
import isnew from "../img/new.svg";
import MyButton from "../MyButton";
import LineDivision from "../LineDivision";
import CreateChat from "../dialogs/CreateChat/CreateChat.js";
import ChatContext from "../../context/ChatContext.jsx";
function Conversations({ type }) {
  const [isLoading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const [conversationLoad, setConversationLoad] = useState(true);
  const { showChats, chats } = useContext(ChatContext);
  const handleOpenCreateChat = () => {
    setOpenCreate(true);
  };
  const handleCreateClose = () => {
    setOpenCreate(false);
  };
  useEffect(() => {
    if (type === "chat") {
      showChats("PERSONAL").then(setConversationLoad(false));
    } else {
      showChats("GROUP").then(() => {
        setConversationLoad(false);
      });
    }
    return () => {
      setConversationLoad(true);
    };
  }, [type]);

  return (
    <div className="chats-list">
      <header className="chats-list__header">
        <h4>Сообщения</h4>
        <div className="chats-list__header-imgs">
          {/* <MyButton src={search} alt="Поиск" /> */}
          <MyButton src={isnew} alt="Добавить" onClick={handleOpenCreateChat} />
          <CreateChat
            handleClose={handleCreateClose}
            open={openCreate}
            type={type}
          />
        </div>
      </header>
      <LineDivision
        style={{
          marginBottom: "15px",
        }}
      />
      <main className="chats-list__main">
        {conversationLoad ? (
          <UniversalLoader size={30} />
        ) : (
          chats.map((item, i) => (
            <div key={i} className="chats-item">
              <MessageItem name={item.name} pic={item.ava} text={item.time} />
            </div>
          ))
        )}
      </main>
    </div>
  );
}

function MessageItem(props) {
  return (
    <div className="mes-item-wrapper">
      <img className="chats-item__picture" src={props.pic} alt="автар" />
      <div className="chats-item__main">
        <div className="chats-item__main-header">{props.name}</div>
        <p className="chats-item__main-text">Hello!!!</p>
      </div>
      <time>
        <span className="chats-item__time">18:00</span>
      </time>
    </div>
  );
}
export default Conversations;
