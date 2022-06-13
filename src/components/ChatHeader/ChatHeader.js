import { Popover } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import attached from "../img/add.svg";
import ava from "../img/ava.png";
import Cross from "../img/Cross.svg";
import hashtag from "../img/hashtag.svg";
import points from "../img/points.svg";
import Search from "../img/search.svg";
import MyButton from "../MyButton";
import MyTextButton from "../MyTextButton";
import { MyTextField2 } from "../MyTextField/MyTextField";
import s from "./ChatHeader.module.scss";
import ChatContext from "../../context/ChatContext";

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
function goTo(link) {
  window.open(link, "_blank");
}
function ChatHeader({ type, info }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    handleMakeSearch,
    searchError,
    setSearchError,
    CorLink,
    takeLinks,
    setCorLink,
  } = useContext(ChatContext);
  console.log(CorLink);
  const [call, setCall] = useState(true);
  const [search, setSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorCallEl, setAnchorCallEl] = useState(null);
  useEffect(() => {
    if (!search) {
      setSearchError("");
    }
  }, [search]);

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      event.shiftKey === false &&
      event.target.value !== ""
    ) {
      event.preventDefault();
      handleMakeSearch(event.target.value);
    }
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

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const teamsChoiceState = Boolean(anchorEl);

  useEffect(() => {
    if (teamsChoiceState) {
      takeLinks(0);
    }
  }, [teamsChoiceState]);
  return (
    <header id="channel__header">
      <div style={{ display: "flex", alignItems: "center" }}>
        <ChatTitle type={type} info={info} />
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
            <>
              {searchError && (
                <p style={{ marginRight: "15px" }}>{searchError}</p>
              )}
              <MyTextField2
                variant="outlined"
                inputProps={formStyle}
                placeholder="Поиск..."
                onKeyDown={handleKeyDown}
              />
            </>
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
              <MyTextButton
                handleClick={() => {
                  goTo(CorLink.when2meet);
                }}
              >
                when2meet
              </MyTextButton>
              <MyTextButton
                handleClick={() => {
                  goTo(CorLink.google);
                }}
              >
                googleMeet
              </MyTextButton>
              <MyTextButton
                handleClick={() => {
                  goTo(CorLink.github);
                }}
              >
                gitHub
              </MyTextButton>
            </div>
          </div>
        </Popover>
      </div>
    </header>
  );
}
function ChatTitle({ info, type }) {
  switch (type) {
    case "channel":
      return <ChannelTitle info={info} />;
      break;
    case "chat":
      return <PersonalChatTitle info={info} />;
      break;
    case "groupchat":
      return <GroupChatTitle info={info} />;
  }
}

function ChannelTitle({ info }) {
  return (
    <div id="channel__header-title">
      <img src={hashtag} alt="hash" id="channel__header-img" />
      <h2>{info}</h2>
    </div>
  );
}

function PersonalChatTitle({ info }) {
  return (
    <div id="chat__header-title">
      <img src={info.ava} alt="hash" className="chat__header-title__img" />
      <span className="chat_header__name">{info.name}</span>
    </div>
  );
}
function GroupChatTitle({ info }) {
  return (
    <div id="chat__header-title">
      <img
        src={info.ava}
        alt="hash"
        className="chat__header-title__img"
        style={{ width: "40px", height: "40px", borderRadius: "100px" }}
      />
      <span className="chat_header__name">{info.name}</span>
    </div>
  );
}

export default ChatHeader;
