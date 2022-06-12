import add from "../img/add.svg";
import send from "../img/send.svg";
import React, { useEffect, useContext, useState } from "react";
import MyButton from "../MyButton";
import AdditionalMessageLine from "../AdditionalMessageLine";
import ChatContext from "../../context/ChatContext";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import common from "../dialogs/Dialog.module.scss";
import { Dialog } from "@mui/material";

function MessageField() {
  let {
    reply,
    red,
    redMessage,
    typeAddMesField,
    sendMessage,
    deleteReply,
    searchOpen,
  } = useContext(ChatContext);
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.shiftKey === false) {
      event.preventDefault();
      handleSend();
    }
  };
  const handleKeyDown2 = (event) => {
    if (event.key === "Enter" && event.shiftKey === false) {
      event.preventDefault();
      handleSend2();
    }
  };
  const [photo, setPhoto] = useState(null);
  const [openPhoto, setOpenPhoto] = useState(false);
  const handlePhoto = (value) => {
    document.getElementById("textEnter").innerText = "";
    deleteReply();
    setPhoto(value);
    setOpenPhoto(true);
  };
  const handlePhotoClose = () => {
    setOpenPhoto(false);
  };
  const handleSend = () => {
    if (document.getElementById("textEnter").innerText != "") {
      const text = document.getElementById("textEnter").innerText;
      sendMessage(document.getElementById("textEnter").innerText, -1);
      document.getElementById("textEnter").innerText = "";
      deleteReply();
    }
  };
  const handleSend2 = () => {
    const text = document.getElementById("textEnter2").innerText;
    sendMessage(document.getElementById("textEnter2").innerText, photo);
    handlePhotoClose();
    document.getElementById("textEnter2").innerText = "";
    deleteReply();
  };
  return (
    <div
      style={{
        height: "80px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        borderTop: "0.2px solid rgba(142, 146, 151, 0.1)",
        display: searchOpen && "none",
      }}
    >
      <div id="mainTextField">
        {(reply || red) && (
          <AdditionalMessageLine element={reply ? reply : red} />
        )}
        <Button
          variant="outlined"
          component="label"
          /* className={s.button} */
          style={{
            fontSize: "10px",
            borderWidth: "0px",
            padding: "0px",
            minWidth: "0px",
          }}
          disableRipple={true}
        >
          <img src={add} />
          <input
            type="file"
            name="photo"
            hidden
            accept="image/*"
            onChange={(e) => {
              const reader = new FileReader();
              const files = e.target.files[0];
              reader.readAsDataURL(files);
              reader.onload = (event) => {
                handlePhoto(event.target.result);
              };
            }}
          />
        </Button>
        <Dialog
          onClose={handlePhotoClose}
          className="modal-central"
          open={openPhoto}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <div
            className={common.modal}
            style={{ width: "500px", padding: "30px 30px 80px 30px" }}
          >
            <img src={photo} width="150px" height="150px" />
            <div id="mainTextField">
              <div
                className="field"
                placeholder="Type a message"
                data-placeholder="Введите сообщение..."
                style={{ cursor: "text" }}
                onKeyDown={handleKeyDown2}
                tabIndex="-1"
                id="textEnter2"
                contentEditable
              >
                {typeAddMesField === "red" && redMessage}
              </div>
              <MyButton
                className="textField__button"
                src={send}
                alt="send message"
                handleClick={() => {
                  handleSend2();
                }}
              />
            </div>
          </div>
        </Dialog>

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
