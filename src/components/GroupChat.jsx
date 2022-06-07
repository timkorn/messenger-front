import Conversations from "./Conversations/Conversations.js";
import Messages from "./Messages/Messages.js";
import MessageField from "./common/messageField.jsx";
import ChatHeader from "./ChatHeader/ChatHeader.js";
import { useParams } from "react-router-dom";

function GroupChat() {
  const { id } = useParams();
  return (
    <>
      <Conversations />
      {id === "start" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <span>Выберите чат</span>
        </div>
      ) : (
        <div id="channel-wrapper">
          <ChatHeader type="chat">Timur Kornilov</ChatHeader>
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
