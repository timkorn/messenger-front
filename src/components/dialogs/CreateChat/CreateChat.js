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
import Ava from "../../img/ava.png";
const formStyle = {
  style: { color: "white", width: "100%", padding: "10px 10px" },
  autoComplete: "off",
  color: "white",
};

function CreateChat({ handleClose, open }) {
  const { logout, authTokens } = useContext(AuthContext);
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const [inputList, setInputList] = useState([]);
  const [inputListAppear, setInputListAppear] = useState(false);
  const [name, setName] = useState("");
  const [load2, setLoad2] = useState(false);
  const [load, setLoad] = useState(false);
  const [openList, setOpenList] = useState(false);
  const handleOpenList = () => {
    setOpenList(true);
  };
  const handleCloseList = () => {
    setOpenList(false);
  };
  const handleChoose = (item) => {
    const newPeople = [...people, item];
    setPeople(newPeople);
  };
  const handleName = (e) => {
    console.log("Value:", e.target.value);
    console.log("open?", openList);
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
          setInputList(result);
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
      className="modal-central"
      open={open}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <div className={cn(common.modal)} style={{ width: "500px" }}>
        <MyButton
          src={cross}
          alt="закрыть"
          className="closeModal"
          handleClick={handleClose}
        />
        <h3>Добавление участников</h3>
        <Formik
          initialValues={{
            name: "",
            team_participants: "",
          }}
          onSubmit={(data) => {
            setLoad(true);
            async function create(data) {
              const team_participants = data.team_participants;
              const name = data.name;
              let response = await fetch(
                "http://localhost:8080/teams/addPerson",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: String(authTokens.accessToken),
                  },
                  body: JSON.stringify({ name, team_participants }),
                }
              );
              let result = await response.json();
              if (response.status === 200) {
                setLoad(false);
                handleClose();
                navigate(`/${result.id}`);
              } else if (result.error === "Unauthorized") {
                logout();
              } else {
                throw new Error();
              }
            }

            create(data).catch((err) => {
              setLoad2(false);
              handleClose();
            });
          }}
        >
          {({ values, isSubmitting, errors }) => (
            <Form id="create-channel-form">
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
                id="text"
              />

              {
                <ListOfSearch
                  open={openList}
                  inputList={inputList}
                  load2={load2}
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
                  borderRadius: "30px",
                }}
              >
                {people.map((item) => {
                  return <Person item={item} />;
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

const ListOfSearch = ({ inputList, open, load2 }) => {
  return (
    <div className={cn(s.list, !open && s.hidden)}>
      {load2 ? (
        <UniversalLoader size="20px" />
      ) : inputList.length === 0 ? (
        <p>Нет результатов</p>
      ) : (
        inputList.map((item) => <PersonInSearch item={item} />)
      )}
    </div>
  );
};

const PersonInSearch = ({ item, handleChoose }) => {
  const handleClick = () => {
    handleChoose(item);
  };
  return (
    <>
      <div onClick={handleClick}>
        <img src={item.img} />
        <p>{item.name}</p>
      </div>
      <LineDivision />
    </>
  );
};

const Person = ({ item }) => {
  const id = item.id;
  return (
    <div
      style={{
        width: "60px",
        height: "40px",
        color: "grey",
        marginRight: "15px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <img src={Ava} />
      <p>{item.name}</p>
      <MyButton img={cross} />
    </div>
  );
};
export default CreateChat;
