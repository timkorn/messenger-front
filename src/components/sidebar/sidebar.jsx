import teamLogo from "./img/messengLogo.jpg";
import plus from "../img/Plus.svg";
import { NavLink } from "react-router-dom";
import arrow from "./img/arrow.svg";
import feedPic from "./img/feed.svg";
import groupCh from "./img/Group.svg";
import CommentSidebar from "./img/Comment.svg";
import ava from "./img/ava.png";
import sett from "./img/settings.svg";
import MyButton from "../MyButton";
import { Modal, Button, Popover } from "@material-ui/core";
import { useState } from "react";
import { Formik, Form } from "formik";
import { MyTextField, formStyle } from "../login.jsx";
import * as yup from "yup";
import cross from "../img/Cross.svg";

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
  const [open, setOpen] = useState(false);
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
            >
              <div>
                <p>Team 1</p>
                <p>Team 2</p>
                <p>Team 3</p>
                <p>Team 4</p>
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
              <div id="channelList">{/* <ChannelName /> */}</div>
            </div>
          </div>
          <div id="sidebar_footer">
            <div id="sidebar_footer_user">
              <img src={ava} alt="Аватарка" id="sidebar_footer_ava" />
              <div id="sidebar_userName">Тимур Корнилов</div>
              <MyButton
                src={sett}
                alt="Настройки"
                className="footer_settings"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
