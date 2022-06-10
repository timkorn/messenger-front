import Conversations from "./Conversations/Conversations.js";
import Messages from "./Messages/Messages.js";
import MessageField from "./common/messageField.jsx";
import ChatHeader from "./ChatHeader/ChatHeader.js";
import { useParams } from "react-router-dom";
import ChatContext from "../context/ChatContext.jsx";
import { useContext } from "react";
function GroupChat() {
  const { chatid } = useParams();
  const { chats } = useContext(ChatContext);
  let chat;
  if (chatid !== "start" && chats.chats != undefined) {
    let chats2 = chats.chats;
    console.log(chats2);
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
          <ChatHeader type="groupchat" info={chat[0]} />
          <div id="channel-main">
            <div id="channel-main__messages">
              <div id="channel-main_message-list">
                <Messages type="groupchat" />
              </div>
              <MessageField />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GroupChat;
