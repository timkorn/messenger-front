import React, { useContext, useEffect, useState } from "react";
import UniversalLoader from "../common/loader.jsx";
import isnew from "../img/new.svg";
import MyButton from "../MyButton";
import LineDivision from "../LineDivision";
import CreateChat from "../dialogs/CreateChat/CreateChat.js";
import ChatContext from "../../context/ChatContext.jsx";
import TeamContext from "../../context/TeamContext.jsx";
import { useNavigate, useMatch } from "react-router-dom";
import cn from "classnames";
import s from "./Conversations.module.scss";

function Conversations({ type }) {
  const [isLoading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const [conversationLoad, setConversationLoad] = useState(true);
  const { showChats, chats } = useContext(ChatContext);
  const { currentTeam } = useContext(TeamContext);
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
      showChats("GROUP").then(setConversationLoad(false));
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
          <>
            {chats.chats != undefined &&
              chats.chats.map((item, i) => (
                <div key={i} className="chats-item">
                  <MessageItem
                    item={item}
                    team={currentTeam}
                    type={type}
                    message={chats.messages[i]}
                  />
                </div>
              ))}
          </>
        )}
      </main>
    </div>
  );
}

function MessageItem({ item, team, type, message }) {
  const navigate = useNavigate();
  const handleOpenMessages = () => {
    navigate(`/${team}/${type}/${item.id}`);
  };
  const match = useMatch(`/${team}/${type}/${item.id}`);
  return (
    <div
      className={cn("mes-item-wrapper", match && s.active)}
      onClick={handleOpenMessages}
    >
      <img className="chats-item__picture" src={item.ava} alt="аватар" />
      <div className="chats-item__main">
        <div className="chats-item__main-header">{item.name}</div>
        <p className="chats-item__main-text">{message && message.text}</p>
      </div>
      <time>
        <span className="chats-item__time">{message && message.time}</span>
      </time>
    </div>
  );
}
export default Conversations;
