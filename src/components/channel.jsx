import React, { useContext, useEffect, useState } from "react";
import MessageField from "./common/messageField.jsx";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages/Messages.js";
import PinnedMessages from "./PinnedMessages/PinnedMessage.js";
import { useParams, Outlet } from "react-router-dom";
import TeamContext from "../context/TeamContext.jsx";
import ChatContext from "../context/ChatContext.jsx";
function Channel() {
  const { chatid } = useParams();
  const { channels } = useContext(TeamContext);
  const name = channels.name[channels.id.indexOf(Number(chatid))];
  const { pin, searchOpen, chatRequest } = useContext(ChatContext);
  return (
    <div id="channel-wrapper">
      <ChatHeader type="channel" info={name} />
      <div id="channel-main">
        <div id="channel-main__messages">
          {(pin || searchOpen || chatRequest) && <PinnedMessages />}
          <Messages type="channel" pin={true} />
          <MessageField />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
export default Channel;
