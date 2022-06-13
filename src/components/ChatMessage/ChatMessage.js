import s from "./ChatMessage.module.scss";
import Popover from "@mui/material/Popover";
import { useState, useContext, useEffect } from "react";
import cn from "classnames";
import edit from "../img/Edit-alt.svg";
import reply from "../img/Reply.svg";
import ChatContext from "../../context/ChatContext";
import MyButton from "../MyButton";
import Pin from "../img/Pin.svg";
import { MyTextField2 } from "../MyTextField/MyTextField";
import AuthContext from "../../context/AuthContext";
function ChatMessage({ user, children, message, search }) {
  let { createReply, createPinRequest, setChatAim, handleCloseSearch } =
    useContext(ChatContext);
  let { messages } = useContext(ChatContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mouseOut, setMouseOut] = useState(true);
  const [reference, setReference] = useState(false);
  useEffect(() => {
    if (message.ref) {
      let info;
      for (let i = 0; i < messages.messages.length; i++) {
        if (messages.messages[i].messageId === message.ref) {
          info = {
            text: messages.messages[i].text,
            name: messages.users[i].username,
          };
        }
      }
      setReference(info);
    }
  }, []);
  useEffect(() => {
    if (
      reference &&
      messages.messages[messages.messages.length - 1].messageId ===
        message.messageId
    ) {
      let r = document.getElementById("mainMessagerProcessor");
      r.scrollTop = r.scrollHeight;
    }
  }, [reference]);
  const handleMouseOver = () => {
    setMouseOut(false);
  };
  const handleMouseOut = () => {
    setMouseOut(true);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
    setMouseOut(true);
  };
  const handlePopover = (event) => {
    setAnchorEl(event.target);
  };
  const handleClickRef = () => {
    setChatAim(message.ref);
  };
  const open = Boolean(anchorEl);
  return (
    <div
      className={cn(s.root, !mouseOut && s.blockHover, reference && s.reply)}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      id={message.messageId}
      onClick={() => {
        if (search) {
          handleCloseSearch(message.messageId);
        }
      }}
    >
      {reference && (
        <div onClick={!search && handleClickRef}>
          <div className={s.parent}>
            <div className={s.child}></div>
          </div>
          <div className={s.repMessage}>
            <span
              style={{
                fontSize: "12px",
                marginBottom: "5px",
                marginRight: "10px",
              }}
            >
              {`${reference.name}:`}
            </span>
            <span
              style={{
                fontSize: "10px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                maxWidth: "70%",
              }}
            >
              {reference.text}
            </span>
          </div>
        </div>
      )}
      <div className={s.ava}>
        <img className={s.img} src={user.avatar} alt="Аватарка" />
      </div>
      <div className={s.box}>
        <div className={s.title}>
          <p
            style={{
              marginBottom: "5px",
              fontSize: "15px",
            }}
            className={s.name}
            onClick={handlePopover}
          >
            {user.username}
          </p>
          <span className={s.time}>{message.time}</span>
        </div>
        <p className={s.body}>{children}</p>
      </div>
      <div className={cn(s.functions, mouseOut && s.hidden)}>
        {!search && (
          <>
            <MyButton
              src={Pin}
              handleClick={() => {
                createPinRequest({ message: message, user: user });
              }}
            />
            <MyButton
              src={reply}
              handleClick={() => {
                createReply(user.username, children, message.messageId);
              }}
            />
          </>
        )}
      </div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        style={{
          marginTop: "16px",
        }}
      >
        <div
          className="popover team-popover"
          style={{
            paddingTop: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            className={s.img}
            src={user.avatar}
            alt="Аватарка"
            style={{ width: "60px", height: "60px" }}
          />
          <h3>{user.username}</h3>
        </div>
      </Popover>
    </div>
  );
}
export default ChatMessage;
