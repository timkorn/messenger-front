import s from "./ChatMessage.module.scss";
import Popover from "@mui/material/Popover";
import { useState, useContext } from "react";
import cn from "classnames";
import edit from "../img/Edit-alt.svg";
import reply from "../img/Reply.svg";
import ChatContext from "../../context/ChatContext";
import MyButton from "../MyButton";
import Pin from "../img/Pin.svg";
import { MyTextField2 } from "../MyTextField/MyTextField";
function ChatMessage({ name, pic, text, children, rep, element, key }) {
  let { createReply, createPinRequest, createRed } = useContext(ChatContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [mouseOut, setMouseOut] = useState(true);
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
  const open = Boolean(anchorEl);
  return (
    <div
      className={cn(s.root, !mouseOut && s.blockHover, rep && s.reply)}
      key={key}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {rep && (
        <>
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
              {`${element.name}:`}
            </span>
            <span
              style={{
                fontSize: "10px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                maxWidth: "70%",
              }}
            >
              {element.message}
            </span>
          </div>
        </>
      )}
      <div className={s.ava}>
        <img className={s.img} src={pic} alt="Аватарка" />
      </div>
      <div>
        <div className={s.title}>
          <p
            style={{
              marginBottom: "5px",
              fontSize: "15px",
            }}
            className={s.name}
            onClick={handlePopover}
          >
            {name}
          </p>
          <span className={s.time}>18:00</span>
        </div>
        <p className={s.body}>{children}</p>
      </div>
      <div className={cn(s.functions, mouseOut && s.hidden)}>
        <MyButton
          src={edit}
          handleClick={() => {
            createRed(name, children);
          }}
        />
        <MyButton
          src={Pin}
          handleClick={() => {
            createPinRequest(element);
          }}
        />
        <MyButton
          src={reply}
          handleClick={() => {
            createReply(name, children);
          }}
        />
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
            src={pic}
            alt="Аватарка"
            style={{ width: "60px", height: "60px" }}
          />
          <h3>{name}</h3>
          <MyTextField2
            variant="outlined"
            placeholder="Написать сообщение"
            inputProps={{ style: { color: "white", fontSize: "12px" } }}
          />
        </div>
      </Popover>
    </div>
  );
}
export default ChatMessage;
