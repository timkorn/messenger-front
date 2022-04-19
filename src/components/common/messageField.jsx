import add from "../img/add.svg";
import send from "../img/send.svg";
import React, { useEffect } from "react";
import MyButton from "../MyButton";
function MessageField() {
  return (
    <div id="mainTextField">
      <MyButton src={add} className="textField__button" alt="add photo" />
      <div
        className="field"
        placeholder="Type a message"
        data-placeholder="Введите сообщение"
        contentEditable
      />
      <MyButton className="textField__button" src={send} alt="send message" />
    </div>
  );
}
export default MessageField;
