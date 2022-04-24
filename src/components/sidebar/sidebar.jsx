import { Button, Modal, Popover } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import cross from "../img/Cross.svg";
import plus from "../img/Plus.svg";
import { formStyle, MyTextField } from "../login.jsx";
import MyButton from "../MyButton";
import arrow from "./img/arrow.svg";
import chosen from "./img/chosen.svg";
import CommentSidebar from "./img/Comment.svg";
import feedPic from "./img/feed.svg";
import groupCh from "./img/Group.svg";
import logout from "./img/Logout.svg";
import teamLogo from "./img/messengLogo.jpg";

const channelShema = yup.object({
  name: yup
    .string()
    .required("поле не заполнено")
    .max(20, "превышен лимит символов(20)"),

  description: yup
    .string()
    .required("поле не заполнено")
    .max(220, "превышен лимит символов(220)"),
});

formStyle.style.width = "350px";
/* formStyle.style.padding = "0 20px 0 0"; */

function Sidebar() {
  const history = useNavigate();
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    history("/login");
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlePopover = (event) => {
    console.log(anchorEl);
    setAnchorEl(event.currentTarget.firstChild);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const teamsChoiceState = Boolean(anchorEl);
  return (
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
                  <p>timadzr@gmail.com</p>
                  <MyButton src={logout} handleClick={handleLogout} />
                </div>
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
                <div className="team-popover-additional">
                  {/* <img
                    src={plus}
                    alt="создание команды"
                  /> */}
                  <p>Создать команду</p>
                </div>
                <div className="team-popover-additional">
                  {/* <img
                    src={sett}
                     className="sidebar_arrow" 
                    alt="настройки"
                    handleClick={handlePopover} 
                  /> */}
                  <p>Настройки</p>
                </div>
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
                /*  */
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
                        <h5>Придумайте название</h5>
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
                        <h5>Добавьте описание</h5>
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
          {/* <div id="sidebar_footer">
            <div id="sidebar_footer_user">
              <img src={ava} alt="Аватарка" id="sidebar_footer_ava" />
              <div id="sidebar_userName">Тимур Корнилов</div>
              <MyButton
                src={sett}
                alt="Настройки"
                className="footer_settings"
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
