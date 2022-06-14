import common from "../Dialog.module.scss";
import { Dialog } from "@mui/material";
import MyButton from "../../MyButton";
import { Form, Formik } from "formik";
import * as yup from "yup";
import cross from "../../img/Cross.svg";
import cn from "classnames";
import { MyTextField } from "../../login.jsx";
import { useEffect, useState, useContext } from "react";
import LineDivision from "../../LineDivision";
import MyLoadingButton from "../../MyLoadingButton";
import { LayoutGroupContext } from "framer-motion";
import AuthContext from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MyTextField2 } from "../../MyTextField/MyTextField";
import s from "./CreateChat.module.scss";
import UniversalLoader from "../../common/loader";
import Ava from "../../startImages/group.png";
import { Button } from "@mui/material";
import ChatContext from "../../../context/ChatContext";
const formStyle = {
  style: { color: "white", width: "100%", padding: "10px 10px" },
  autoComplete: "off",
  color: "white",
};

const settingsShema = yup.object({
  name: yup
    .string()
    .required("поле не заполнено")
    .max(20, "превышен лимит символов(20)"),
});

function CreateChat({ handleClose, open, type }) {
  const { logoutUser, authTokens, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const [inputList, setInputList] = useState([]);
  const [inputListAppear, setInputListAppear] = useState(false);
  const [name, setName] = useState("");
  const [load2, setLoad2] = useState(false);
  const [load, setLoad] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [peopleError, setPeopleError] = useState("");
  const { showChats, chats } = useContext(ChatContext);

  useEffect(() => {
    setPeopleError("");
    if (!open) {
      setPeople([]);
    }
  }, [open]);
  const handleClosePerson = (id) => {
    let newP = people.filter((item) => item.id !== id);
    setPeople(newP);
  };
  const handleOpenList = () => {
    setOpenList(true);
  };
  const handleCloseList = () => {
    setOpenList(false);
  };
  const handleChoose = (item) => {
    if (people.length === 1 && type === "chat") {
      return;
    }
    const newPeople = [...people, item];
    let tmpArray = [];
    function itemCheck(item) {
      if (tmpArray.indexOf(item.id) === -1 && item.id != user.id) {
        tmpArray.push(item.id);
        return true;
      }
      return false;
    }
    let newP = newPeople.filter((item) => itemCheck(item));

    setPeople(newP);
  };
  const handleName = (e) => {
    if (e.target.value === "") {
      handleCloseList();
    } else {
      if (!openList) {
        handleOpenList();
      }
      setLoad2(true);
      async function loadPeople(name) {
        let response = await fetch(
          "http://localhost:8080/adding/userSearch/" + name,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let result = await response.json();

        if (response.status === 200) {
          if (type !== "chat") {
            setInputList(
              result.filter((item) => item.id != user.id && item.id != 1)
            );
          } else {
            let result1 = result.filter((item) => {
              for (let i = 0; i < chats.chats.length; i++) {
                if (
                  item.id + " " + user.id === chats.chats[i].participants ||
                  user.id + " " + item.id === chats.chats[i].participants
                ) {
                  return false;
                }
              }
              return true;
            });

            setInputList(
              result1.filter((item) => item.id != user.id && item.id != 1)
            );
          }
          setLoad2(false);
        } else {
          throw new Error();
        }
      }
      loadPeople(e.target.value).catch((err) => {
        console.log(err);
      });
    }
  };
  return (
    <Dialog
      onClose={handleClose}
      className={cn("modal-central", s.modal)}
      open={open}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <div className={cn(common.modal)} style={{ width: "550px" }}>
        <MyButton
          src={cross}
          alt="закрыть"
          className="closeModal"
          handleClick={handleClose}
        />
        <h3>
          Создание{" "}
          {type === "groupchat" ? "группового чата" : "персонального чата"}
        </h3>
        {peopleError && (
          <p className="loginError" style={{ top: "40px" }}>
            {peopleError}
          </p>
        )}
        <Formik
          initialValues={{
            name: "",
            team_participants: "",
            photo: Ava,
          }}
          validationSchema={type === "groupchat" && settingsShema}
          onSubmit={(data) => {
            if (people == []) {
              setPeopleError("Добавьте собеседников");
            } else if (people.length < 2 && type === "groupchat") {
              setPeopleError("Группа образуется от 3 человек");
            } else {
              createChat(data);
            }
            function createChat(data) {
              setLoad(true);
              async function create(data) {
                const participants = people;

                let ava;
                let t;
                let name;
                if (type === "groupchat") {
                  t = "GROUP";
                  ava = data.photo;
                  name = data.name;
                } else {
                  t = "PERSONAL";
                }
                if (t === "PERSONAL") {
                  let person = participants[0];
                  let personId = person.id;
                  let personAva = person.avatar;
                  let personName = person.username;
                  let response1 = await fetch(
                    "http://localhost:8080/chat/getUser",
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: String(authTokens.accessToken),
                      },
                    }
                  );
                  let result1 = await response1.json();

                  if (result1.id < personId) {
                    name = result1.username + "," + personName;
                    ava = result1.avatar + " " + personAva;
                  } else {
                    name = personName + "," + result1.username;
                    ava = personAva + " " + result1.avatar;
                  }
                }
                let response = await fetch(
                  "http://localhost:8080/chat/create",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: String(authTokens.accessToken),
                    },
                    body: JSON.stringify({ name, participants, type: t, ava }),
                  }
                );
                let result = await response.json();
                if (response.status === 200) {
                  setLoad(false);
                  handleClose();
                  showChats(t);
                } else if (result.error === "Unauthorized") {
                  logoutUser();
                } else {
                  throw new Error();
                }
              }

              create(data).catch((err) => {
                setLoad2(false);
                handleClose();
              });
            }
          }}
        >
          {({ values, isSubmitting, errors, setFieldValue }) => (
            <Form id="create-channel-form">
              {type === "groupchat" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div className={s.photoChoice}>
                    <img
                      className={s.settPhoto}
                      src={values.photo}
                      width="85px"
                      height="85px"
                      alt="фото профиля"
                    />
                    <div>
                      <p>Фото беседы</p>
                      <div>
                        <Button
                          variant="outlined"
                          component="label"
                          className={s.button}
                          style={{ fontSize: "10px" }}
                        >
                          Загрузить фото
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
                                setFieldValue("photo", event.target.result);
                              };
                            }}
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <MyTextField
                      variant="outlined"
                      style={{ color: "white", marginTop: "30px" }}
                      name="name"
                      type="input"
                      inputProps={formStyle}
                      InputLabelProps={{
                        style: { color: "#fff" },
                      }}
                      placeholder="название"
                    >
                      {values.name}
                    </MyTextField>
                  </div>
                </div>
              )}
              <MyTextField2
                variant="outlined"
                style={{ color: "white", position: "relative" }}
                type="input"
                inputProps={formStyle}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                placeholder="введите имя"
                onChange={handleName}
                onBlur={handleCloseList}
                onFocus={(e) => {
                  if (e.target.value != "") {
                    handleOpenList();
                  }
                }}
                id="text"
              />

              {
                <ListOfSearch
                  open={openList}
                  inputList={inputList}
                  load2={load2}
                  handleChoose={handleChoose}
                  type={type}
                />
              }
              <p style={{ marginTop: "20px" }}>Добавленные пользователи</p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  minHeight: "100px",
                  maxHeight: "150px",
                  overflowY: "scroll",
                  backgroundColor: "#151617",
                  borderRadius: "15px",
                  padding: "10px",
                }}
              >
                {people.map((item) => {
                  return <Person item={item} handleClose={handleClosePerson} />;
                })}
              </div>
              <MyLoadingButton
                variant="contained"
                type="submut"
                classNames={{ alignSelf: "center" }}
                loading={load}
              >
                Добавить
              </MyLoadingButton>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
}

const ListOfSearch = ({ inputList, open, load2, handleChoose, type }) => {
  return (
    <div
      className={cn(s.list, !open && s.hidden, type === "groupchat" && s.group)}
    >
      {load2 ? (
        <UniversalLoader size={30} />
      ) : inputList.length === 0 ? (
        <p style={{ margin: "15px" }}>Нет результатов</p>
      ) : (
        inputList.map((item) => (
          <PersonInSearch item={item} handleChoose={handleChoose} />
        ))
      )}
    </div>
  );
};

const PersonInSearch = ({ item, handleChoose }) => {
  const handleClick = () => {
    console.log("Chosen");
    handleChoose(item);
  };
  return (
    <>
      <div
        onMouseDown={handleClick}
        style={{
          display: "flex",
          padding: "8px",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <img
          src={Ava}
          style={{ height: "27px", width: "27px", marginRight: "15px" }}
        />
        <p>{item.username}</p>
      </div>
      <LineDivision />
    </>
  );
};

const Person = ({ item, handleClose }) => {
  const id = item.id;
  const handleDeletePerson = () => {
    handleClose(id);
  };
  return (
    <div
      style={{
        height: "40px",
        color: "grey",
        marginRight: "15px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "30px",
        backgroundColor: "rgb(255, 255, 255, 0.2)",
        padding: "0px 7px",
      }}
    >
      <img
        src={Ava}
        style={{ height: "27px", width: "27px", marginRight: "6px" }}
      />
      <p style={{ fontSize: "12px" }}>{item.username}</p>
      <MyButton
        src={cross}
        handleClick={handleDeletePerson}
        style={{ marginTop: "5px" }}
        className={s.close}
        type="button"
      />
    </div>
  );
};
export default CreateChat;
