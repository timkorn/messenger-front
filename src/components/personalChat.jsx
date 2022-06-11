import Conversations from "./Conversations/Conversations.js";
import Messages from "./Messages/Messages.js";
import MessageField from "./common/messageField.jsx";
import ChatHeader from "./ChatHeader/ChatHeader.js";
import { useParams } from "react-router-dom";
import ChatContext from "../context/ChatContext.jsx";
import { useContext } from "react";
function PersonalChat() {
  const { chatid } = useParams();
  const { chats } = useContext(ChatContext);
  let chat;
  if (chatid !== "start" && chats.chats != undefined) {
    chat = chats.chats.filter((item) => item.id === Number(chatid));
  }
  return (
    <>
      <Conversations type="chat" />
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
          <ChatHeader type="chat" info={chat} />
          <div id="channel-main">
            <div id="channel-main__messages">
              <div id="channel-main_message-list">
                <Messages type="channel" />
              </div>
              <MessageField />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default PersonalChat;
