import { Button, Dialog, Popover } from "@mui/material";
import { Form, Formik } from "formik";
import Hashtag from "./img/hashtag.svg";
import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import * as yup from "yup";
import AuthContext from "../../context/AuthContext";
import cross from "../img/Cross.svg";
import plus from "../img/Plus.svg";
import LineDivision from "../LineDivision";
import { MyTextField } from "../MyTextField/MyTextField.js";
import MyButton from "../MyButton";
import MyTextButton from "../MyTextButton";
import Settings from "../dialogs/settings";
import arrow from "./img/arrow.svg";
import CommentSidebar from "./img/Comment.svg";
import feedPic from "./img/feed.svg";
import groupCh from "./img/Group.svg";
import logout from "./img/Logout.svg";
import teamLogo from "./img/messengLogo.jpg";
import CreateTeam from "../dialogs/CreateTeam";
import Notif from "../img/Notification.svg";
import s from "./sidebar.module.scss";
import CreateChannel from "../dialogs/CreateChannel";
import TeamContext from "../../context/TeamContext";
import ShowTeamsItem from "../ShowTeamsItem";
import Plus from "../img/Plus.svg";
import AddPerson from "../dialogs/AddPerson";
import UniversalLoader from "../common/loader";

/* const channelShema = yup.object({
  name: yup.string().required("Введите имя"),

  oldPassword: yup
    .string()
    .required("поле не заполнено")
    .max(220, "превышен лимит символов(220)"),
  newPassword: yup
    .string()
    .required("Введите пароль")
    .min(6, "Введите больше 6 символов")
    .max(20, "Введите не больше 20 символов")
    .matches(/^[A-Za-z0-9]+$/, "Формат: 1-9 и Aa-Zz"),
}); */

function Sidebar() {
  let { user } = useContext(AuthContext);
  let { logoutUser } = useContext(AuthContext);
  const [openAdd, setOpenAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const { teams, showTeams, currentTeam, showChannels, channels, teamInfo } =
    useContext(TeamContext);
  const [loadChannels, setLoadChannels] = useState(true);
  useEffect(() => {
    showChannels().then(() => {
      setLoadChannels(false);
    });
  }, [currentTeam]);
  useEffect(() => {
    showChannels().then(() => {
      setLoadChannels(false);
    });
  }, []);
  const handleCreateOpen = () => {
    setOpenCreate(true);
    setAnchorEl(null);
  };
  const handleCreateClose = () => {
    setOpenCreate(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlePopover = async (event) => {
    setAnchorEl(event.currentTarget.firstChild);
    showTeams().catch((err) => {
      console.log(err);
    });
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  const [openSettings, setOpenSettings] = useState(false);
  const handleOpenSettings = () => {
    setOpenSettings(true);
    setAnchorEl(null);
  };
  const handleCloseSettings = () => {
    setOpenSettings(false);
  };
  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleAddClose = () => {
    setOpenAdd(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const teamsChoiceState = Boolean(anchorEl);
  return (
    <div style={{ display: "flex" }}>
      <div className="App">
        <div id="sidebar">
          <div id="sidebar_header">
            <div id="sidebar_header_team">
              <img id="tLogo" src={teamInfo.avatar} alt="Фото команды" />
              <div>{teamInfo.name}</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <MyButton
                  src={arrow}
                  className="sidebar_arrow"
                  alt="Выбор команды"
                  handleClick={handlePopover}
                />
                {/* <MyButton
                  src={Notif}
                  className={s.notif}
                  style={{
                    position: "absolute",
                    top: "27px",
                    right: "15px",
                  }}
                /> */}
              </div>
              <Popover
                open={teamsChoiceState}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  horizontal: "center",
                }}
                style={{
                  marginTop: "8px",
                }}
              >
                <div className="popover team-popover">
                  <div className="team-popover-personal">
                    <p>{user.sub}</p>
                    <MyButton src={logout} handleClick={logoutUser} />
                  </div>
                  <LineDivision
                    style={{
                      marginLeft: "-10px",
                      width: "213px",
                      marginBottom: "10px",
                    }}
                  />
                  <div className="team-popover-choice">
                    {teams &&
                      teams.id.map((item, index) => (
                        <ShowTeamsItem
                          id={item}
                          name={teams.name[index]}
                          key={item}
                          onClick={handleClosePopover}
                        />
                      ))}
                  </div>
                  <LineDivision
                    style={{
                      marginLeft: "-10px",
                      width: "213px",
                      marginBottom: "10px",
                      marginTop: "10px",
                    }}
                  />
                  <MyTextButton handleClick={handleCreateOpen}>
                    Создать команду
                  </MyTextButton>

                  <MyTextButton handleClick={handleOpenSettings}>
                    Настройки аккаунта
                  </MyTextButton>
                </div>
              </Popover>
              <CreateTeam open={openCreate} handleClose={handleCreateClose} />
              <Settings open={openSettings} handleClose={handleCloseSettings} />
            </div>
          </div>
          <div id="sidebar_main">
            <div id="sidebar_main_default">
              <NavLink
                to={`chat/start`}
                className={({ isActive }) =>
                  isActive ? "sidebar_choice activeSidebar" : "sidebar_choice"
                }
              >
                <div className="sidebar_main_topics">
                  <img src={CommentSidebar} class="sidebar_icon" />
                  <div>Персональные чаты</div>
                </div>
              </NavLink>
              <NavLink
                to={`groupchat/start`}
                className={({ isActive }) =>
                  isActive ? "sidebar_choice activeSidebar" : "sidebar_choice"
                }
              >
                <div className="sidebar_main_topics">
                  <img src={groupCh} id="groupChat" class="sidebar_icon" />
                  <div>Групповые чаты</div>
                </div>
              </NavLink>
              <div id="sidebar_main_channels_header">
                <div id="sidebar_main_channels_h">КАНАЛЫ</div>
                <MyButton
                  src={plus}
                  alt="добавить канал"
                  handleClick={handleOpen}
                  className={s.plus}
                />
                <CreateChannel
                  open={open}
                  handleClose={handleClose}
                  id={currentTeam}
                />
              </div>
              <div className="sidebar_main_channels ">
                <div id="channelList" style={{ position: "relative" }}>
                  {loadChannels ? (
                    <UniversalLoader size={30} />
                  ) : (
                    <ShowChannels channels={channels} team_id={currentTeam} />
                  )}
                </div>
                <MyTextButton
                  handleClick={handleOpenAdd}
                  image={Plus}
                  className="addPerson"
                >
                  Добавить участника
                </MyTextButton>
                <AddPerson open={openAdd} handleClose={handleAddClose} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShowChannels({ channels, team_id }) {
  return (
    <>
      {channels &&
        channels.id.map((item, i) => (
          <ChannelButton id={item} name={channels.name[i]} team_id={team_id} />
        ))}
    </>
  );
}
function ChannelButton({ id, name, team_id }) {
  return (
    <NavLink
      to={`/${team_id}/channel/${id}`}
      className={({ isActive }) =>
        isActive ? "sidebar_choice activeSidebar" : "sidebar_choice"
      }
    >
      <div className="sidebar_main_topics">
        <img src={Hashtag} class="sidebar_icon" />
        <div>{name}</div>
      </div>
    </NavLink>
  );
}

export default Sidebar;
