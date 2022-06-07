import React, { useEffect, useState } from "react";
import MessageField from "./common/messageField.jsx";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages/Messages.js";
import PinnedMessages from "./PinnedMessages/PinnedMessage.js";
import { useParams, Outlet } from "react-router-dom";
function Channel() {
  const { id } = useParams();
  console.log(id);
  return (
    <div id="channel-wrapper">
      <ChatHeader type="channel">relax</ChatHeader>
      <div id="channel-main">
        <div id="channel-main__messages">
          <PinnedMessages />
          <Messages type="channel" pin={true} />
          <MessageField />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
export default Channel;
