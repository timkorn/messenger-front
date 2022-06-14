import Conversations from "./Conversations/Conversations.js";
import Messages from "./Messages/Messages.js";
import MessageField from "./common/messageField.jsx";
import ChatHeader from "./ChatHeader/ChatHeader.js";
import { useParams } from "react-router-dom";
import ChatContext from "../context/ChatContext.jsx";
import { useContext } from "react";
import PinnedMessages from "./PinnedMessages/PinnedMessage.js";

function GroupChat() {
  const { chatid } = useParams();
  const { chats, pin, searchOpen, chatRequest } = useContext(ChatContext);
  let chat;
  if (chatid !== "start" && chats.chats != undefined) {
    let chats2 = chats.chats;

    chat = chats2.filter((item) => item.id === Number(chatid));
  }
  return (
    <>
      <Conversations type="groupchat" />
      {chatid === "start" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <span>Выберите или создайте чат</span>
        </div>
      ) : (
        <div id="channel-wrapper">
          {chat && <ChatHeader type="groupchat" info={chat[0]} />}
          <div id="channel-main">
            <div id="channel-main__messages">
              {(pin || searchOpen || chatRequest) && <PinnedMessages />}
              <Messages />
              <MessageField />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GroupChat;
