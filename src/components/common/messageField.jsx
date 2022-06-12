import add from "../img/add.svg";
import send from "../img/send.svg";
import React, { useEffect, useContext } from "react";
import MyButton from "../MyButton";
import AdditionalMessageLine from "../AdditionalMessageLine";
import ChatContext from "../../context/ChatContext";
import { useParams } from "react-router-dom";
function MessageField() {
  let { reply, red, redMessage, typeAddMesField, sendMessage, deleteReply } =
    useContext(ChatContext);
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.shiftKey === false) {
      event.preventDefault();
      handleSend();
    }
  };
  const handleSend = () => {
    if (document.getElementById("textEnter").innerText != "") {
      const text = document.getElementById("textEnter").innerText;
      sendMessage(document.getElementById("textEnter").innerText);
      document.getElementById("textEnter").innerText = "";
      deleteReply();
    }
  };
  return (
    <div
      style={{
        height: "80px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        borderTop: "0.2px solid rgba(142, 146, 151, 0.1)",
      }}
    >
      <div id="mainTextField">
        {(reply || red) && (
          <AdditionalMessageLine element={reply ? reply : red} />
        )}
        <MyButton src={add} className="textField__button" alt="add photo" />
        <div
          className="field"
          placeholder="Type a message"
          data-placeholder="Введите сообщение..."
          style={{ cursor: "text" }}
          onKeyDown={handleKeyDown}
          tabIndex="-1"
          id="textEnter"
          contentEditable
        >
          {typeAddMesField === "red" && redMessage}
        </div>
        <MyButton
          className="textField__button"
          src={send}
          alt="send message"
          handleClick={() => {
            handleSend();
          }}
        />
      </div>
    </div>
  );
}
export default MessageField;
