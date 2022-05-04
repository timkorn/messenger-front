import { Button, Modal, Popover } from "@mui/material";
import { Form, Formik } from "formik";
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import * as yup from "yup";
import AuthContext from "../../context/AuthContext";
import cross from "../img/Cross.svg";
import plus from "../img/Plus.svg";
import LineDivision from "../LineDivision";
import { formStyle, MyTextField } from "../login.jsx";
import MyButton from "../MyButton";
import MyTextButton from "../MyTextButton";
import Settings from "../modals/settings";
import arrow from "./img/arrow.svg";
import chosen from "./img/chosen.svg";
import CommentSidebar from "./img/Comment.svg";
import feedPic from "./img/feed.svg";
import groupCh from "./img/Group.svg";
import logout from "./img/Logout.svg";
import teamLogo from "./img/messengLogo.jpg";
import CreateTeam from "../modals/CreateTeam";
const channelShema = yup.object({
  name: yup.string().required("Введите своё имя"),

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
});

formStyle.style.width = "350px";
/* formStyle.style.padding = "0 20px 0 0"; */

function Sidebar() {
  let { user } = useContext(AuthContext);
  let { logoutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const handleCreateOpen = () => {
    setOpenCreate(true);
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
  const [teams, setTeams] = useState([]);
  const handlePopover = async (event) => {
    /* let response = await fetch("http://localhost:8080/api/teams/show", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("authTokens"),
      },
    });
    let result = await response.json();
    setTeams(result); */
    setAnchorEl(event.currentTarget.firstChild);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  const [openSettings, setOpenSettings] = useState(false);
  const handleOpenSettings = () => {
    setOpenSettings(true);
  };
  const handleCloseSettings = () => {
    setOpenSettings(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const teamsChoiceState = Boolean(anchorEl);
  return (
    <div style={{ display: "flex" }}>
      <div className="App">
        <div id="sidebar">
          <div id="sidebar_header">
            <div id="sidebar_header_team">
              <img id="tLogo" src={teamLogo} alt="Фото команды" />
              <div>Курсач</div>
              <MyButton
                src={arrow}
                className="sidebar_arrow"
                alt="Выбор команды"
                handleClick={handlePopover}
              />
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
                    <p>{user.email}</p>
                    <MyButton src={logout} handleClick={logoutUser} />
                  </div>
                  <LineDivision style={{ margin: "7px 0", width: "220px" }} />
                  <div className="team-popover-choice">
                    <Link to="/" className="sidebar_choice">
                      <div className="team-popover-choice-container">
                        <div>
                          <p>Курсач</p>
                        </div>
                        <img src={chosen} />
                      </div>
                    </Link>
                    <Link to="/" className="sidebar_choice">
                      <div className="team-popover-choice-container">
                        <div>
                          <p>Курсач</p>
                        </div>
                        <img src={chosen} />
                      </div>
                    </Link>
                    <Link to="/" className="sidebar_choice">
                      <div className="team-popover-choice-container">
                        <div>
                          <p>Курсач</p>
                        </div>
                        <img src={chosen} />
                      </div>
                    </Link>
                  </div>
                  <LineDivision
                    margin="-15px"
                    style={{ margin: "7px -15px" }}
                  />
                  <MyTextButton handleClick={handleCreateOpen}>
                    Создать команду
                  </MyTextButton>
                  <CreateTeam
                    open={openCreate}
                    handleClose={handleCreateClose}
                  />

                  <MyTextButton handleClick={handleOpenSettings}>
                    Настройки аккаунта
                  </MyTextButton>
                  <Settings
                    open={openSettings}
                    handleClose={handleCloseSettings}
                  />
                </div>
              </Popover>
            </div>
          </div>
          <div id="sidebar_main">
            <div id="sidebar_main_default">
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  isActive ? "sidebar_choice activeSidebar" : "sidebar_choice"
                }
              >
                <div className="sidebar_main_topics">
                  <img src={feedPic} class="sidebar_icon" />
                  <div>Лента</div>
                </div>
              </NavLink>
              <NavLink
                to="/chat"
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
                to="/chat"
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
                />
                <Modal
                  onClose={handleClose}
                  className="modal-central"
                  open={open}
                  aria-labelledby="child-modal-title"
                  aria-describedby="child-modal-description"
                >
                  <div id="create-channel">
                    <MyButton
                      src={cross}
                      alt="закрыть"
                      className="closeModal"
                      handleClick={handleClose}
                    />
                    <h3>Создание канала</h3>
                    <Formik
                      initialValues={{
                        name: "",
                        description: "",
                      }}
                      validationSchema={channelShema}
                      onSubmit={(data) => {
                        console.log(data);
                      }}
                    >
                      {({ values, isSubmitting, errors }) => (
                        <Form id="create-channel-form">
                          <p>Придумайте название</p>
                          <MyTextField
                            variant="outlined"
                            style={{ color: "white" }}
                            name="name"
                            type="input"
                            inputProps={formStyle}
                            InputLabelProps={{
                              style: { color: "#fff" },
                            }}
                            placeholder="название"
                          />
                          <p>Добавьте описание</p>
                          <MyTextField
                            rows={4}
                            variant="outlined"
                            color="white"
                            name="description"
                            type="input"
                            multiline
                            inputProps={{
                              ...formStyle,
                              ...{
                                style: {
                                  ...formStyle.style,
                                  padding: "0 20px 0 0",
                                },
                              },
                            }}
                            InputLabelProps={{
                              style: { color: "#fff" },
                            }}
                            placeholder="описание"
                          />

                          <Button
                            id="create-chan-button"
                            variant="contained"
                            type="submut"
                          >
                            Создать канал
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </Modal>
              </div>
              <div className="sidebar_main_channels ">
                <div id="channelList"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
