import MyButton from "../MyButton";
import React, { useEffect } from "react";
import MessageField from "../common/messageField.jsx";
import hashtag from "../img/hashtag.svg";
import search from "../img/search.svg";
import phone from "../img/phone.svg";
import points from "../img/points.svg";
import ChannelMessage from "./channelMessages.jsx";
function Channel() {
  return (
    <div id="channel-wrapper">
      <header id="channel__header">
        <div id="channel__header-title">
          <img src={hashtag} alt="hash" id="channel__header-img" />
          <h2>relax</h2>
          <span id="channel__header-description">chill and relax</span>
        </div>
        <div id="channel__header-buttons">
          <MyButton className="channel__header-b" src={search} alt="search" />
          <MyButton className="channel__header-b" src={phone} alt="phone" />
          <MyButton className="channel__header-b" src={points} alt="points" />
        </div>
      </header>
      <div id="channel-main">
        <div id="channel-main__messages">
          <div id="channel-main_message-list">
            <ChannelMessage />
          </div>
          <MessageField />
        </div>
        <div id="channel-main__window"></div>
      </div>
    </div>
  );
}
export default Channel;
