import React, { useEffect } from "react";
import MessageField from "../common/messageField.jsx";
import ChatMessages from "./chatMessages.jsx";
import search from "../img/search.svg";
import phone from "../img/phone.svg";
import points from "../img/points.svg";
import ava from "../img/ava.png";
import MyButton from "../MyButton";
function ChatMain() {
  return (
    <div id="channel-wrapper">
      <header id="channel__header">
        <div id="chat__header-title">
          <img src={ava} alt="hash" className="chat__header-title__img" />
          <span className="chat_header__name">Timur Kornilov</span>
        </div>
        <div id="channel__header-buttons">
          <MyButton src={search} alt="search" className="channel__header-b" />
          <MyButton src={phone} alt="phone" className="channel__header-b" />
          <MyButton src={points} alt="points" className="channel__header-b" />
        </div>
      </header>
      <div id="channel-main">
        <div id="channel-main__messages">
          <div id="channel-main_message-list">
            <ChatMessages />
          </div>
          <MessageField />
        </div>
        <div id="channel-main__window"></div>
      </div>
    </div>
  );
}

export default ChatMain;
