import MyButton from "../MyButton";
import hashtag from "../img/hashtag.svg";
import Search from "../img/search.svg";
import phone from "../img/phone.svg";
import points from "../img/points.svg";
import ava from "../img/ava.png";
import s from "./ChatHeader.module.scss";
import { useState } from "react";
import { Modal } from "@mui/material";
import Cross from "../img/Cross.svg";
import { Popover, Button } from "@mui/material";
import MyTextButton from "../MyTextButton";
import volumeOff from "../img/Volume-off.svg";
import attached from "../img/add.svg";
import sett from "../img/Settings-alt.svg";
import { MyTextField2 } from "../MyTextField/MyTextField";
import Attachment from "../dialogs/Attachment/Attachment";
import { Route, useLocation, useNavigate } from "react-router-dom";
import MyLoadingButton from "../MyLoadingButton";
import cn from "classnames";
const formStyle = {
  style: {
    color: "white",
    width: "150px",
    paddingTop: "10px",
    paddingBottom: "10px",
    fontSize: "14px",
  },
  autoComplete: "off",
  color: "white",
};
function ChatHeader({ type, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [call, setCall] = useState(true);
  const [search, setSearch] = useState(false);
  const [chatSettingsList, setChatSettingsList] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorCallEl, setAnchorCallEl] = useState(null);
  const handleEnterAudioCall = () => {
    navigate(`${location.pathname}/audiocall`);
  };

  const handleOpenCall = () => {
    setCall(true);
  };
  const handleCloseCall = () => {
    setCall(false);
  };
  const handleOpenAttch = () => {
    navigate(`${location.pathname}/attachment`);
  };
  const handleOpenSearch = () => {
    setSearch(true);
  };
  const handleCloseSearch = () => {
    setSearch(false);
  };
  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget.firstChild);
  };
  const handleCallPopover = (event) => {
    setAnchorCallEl(event.currentTarget.firstChild);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  const handleCloseCallPopover = () => {
    setAnchorCallEl(null);
  };
  const handleCreateAudio = () => {
    console.log("create audio");
  };
  const teamsChoiceState = Boolean(anchorEl);
  const videoCall = Boolean(anchorCallEl);
  return (
    <header id="channel__header">
      <div style={{ display: "flex", alignItems: "center" }}>
        <ChatTitle type={type}>{children}</ChatTitle>
        {/* {call && (
          <div className={s.callButton} onClick={handleEnterAudioCall}>
            <span>Идёт встреча</span>
            <div className={cn(s.dot, s.blink)}></div>
          </div>
        )} */}
      </div>
      <div id="channel__header-buttons">
        <div className={s.search}>
          {search && (
            <MyTextField2
              variant="outlined"
              inputProps={formStyle}
              placeholder="Поиск..."
            />
          )}
        </div>
        <MyButton
          className="channel__header-b"
          src={search ? Cross : Search}
          alt="search"
          handleClick={search ? handleCloseSearch : handleOpenSearch}
        />

        {/* <MyButton
          className="channel__header-b"
          src={phone}
          alt="phone"
          handleClick={handleCallPopover}
        />
        <Popover
          open={videoCall}
          anchorEl={anchorCallEl}
          onClose={handleCloseCallPopover}
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
            <p>Начать аудиозвонок?</p>
            <div>
              <MyLoadingButton
                size="small"
                style={{ margin: "10px" }}
                onClick={handleCreateAudio}
              >
                Начать
              </MyLoadingButton>
              <Button size="small" onClick={handleCloseCallPopover}>
                Отмена
              </Button>
            </div>
          </div>
        </Popover> */}
        <MyButton
          className="channel__header-b"
          src={points}
          alt="points"
          handleClick={handlePopover}
        />
        <Popover
          open={teamsChoiceState}
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
          <div className="popover team-popover" style={{ paddingTop: "10px" }}>
            <div className="team-popover-choice">
              <MyTextButton handleClick={handleOpenAttch} image={attached}>
                Показать вложения
              </MyTextButton>
              <MyTextButton /* handleClick={} */ image={volumeOff}>
                Выкл. уведомления
              </MyTextButton>
              <MyTextButton /* handleClick={} */ image={sett}>
                Настройки
              </MyTextButton>
            </div>
          </div>
        </Popover>
      </div>
    </header>
  );
}
function ChatTitle({ children, type }) {
  switch (type) {
    case "channel":
      return <ChannelTitle>{children}</ChannelTitle>;
      break;
    case "chat":
      return <PersonalChatTitle>{children}</PersonalChatTitle>;
      break;
    case "groupChat":
      return <GroupChatTitle>{children}</GroupChatTitle>;
  }
}

function ChannelTitle({ children }) {
  return (
    <div id="channel__header-title">
      <img src={hashtag} alt="hash" id="channel__header-img" />
      <h2>{children}</h2>
    </div>
  );
}

function PersonalChatTitle({ children }) {
  return (
    <div id="chat__header-title">
      <img src={ava} alt="hash" className="chat__header-title__img" />
      <span className="chat_header__name">{children}</span>
    </div>
  );
}
function GroupChatTitle({ children }) {
  return (
    <div id="chat__header-title">
      <img src={ava} alt="hash" className="chat__header-title__img" />
      <span className="chat_header__name">{children}</span>
    </div>
  );
}
export default ChatHeader;
