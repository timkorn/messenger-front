import s from "./CreateTeam.module.scss";
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
import Ava from "../../img/ava.png";
import { Button } from "@mui/material";
const formStyle = {
  style: { color: "white", width: "250px", padding: "10px 10px" },
  autoComplete: "off",
  color: "white",
};
const createTeamShema = yup.object({
  name: yup
    .string()
    .required("поле не заполнено")
    .max(20, "превышен лимит символов(20)"),
});
const CreateTeam = ({ handleClose, open }) => {
  const { logoutUser, authTokens } = useContext(AuthContext);
  const [load, setLoad] = useState(false);
  const [createError, setCreateError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!open) {
      if (createError) {
        setCreateError("");
      }
    }
  }, [open]);
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
        <h3>Создание команды</h3>
        {createError && (
          <p className="loginError" style={{ top: "40px" }}>
            {createError}
          </p>
        )}
        <Formik
          initialValues={{
            name: "",
            team_participants: "",
            photo: Ava,
          }}
          validationSchema={createTeamShema}
          onSubmit={(data) => {
            setLoad(true);
            setCreateError("");
            async function create(data) {
              const team_participants = data.team_participants;
              const name = data.name;
              const avatar = data.photo;
              let response = await fetch("http://localhost:8080/teams/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: String(authTokens.accessToken),
                },
                body: JSON.stringify({ name, team_participants, avatar }),
              });
              let result = await response.json();
              if (response.status === 200 && result) {
                setLoad(false);
                handleClose();
                navigate(`/${result.id}`);
              } else if (result.error === "Unauthorized") {
                logoutUser();
              } else {
                throw new Error();
              }
            }
            create(data).catch((err) => {
              setLoad(false);
              setCreateError("Введён email несуществующего аккаунта");
            });
          }}
        >
          {({ values, isSubmitting, errors, setFieldValue }) => (
            <Form id="create-channel-form">
              <div className={s.photoChoice}>
                <img
                  className={s.settPhoto}
                  src={values.photo}
                  width="85px"
                  height="85px"
                  alt="фото профиля"
                />
                <div>
                  <p>Фото профиля</p>
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
              <MyTextField
                margin="normal"
                variant="outlined"
                name="name"
                type="input"
                inputProps={{
                  ...formStyle,
                  style: { ...formStyle.style, width: "100%" },
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                placeholder="название"
              />
              <p style={{ paddingBottom: "10px", paddingTop: "15px" }}>
                Добавление участников
              </p>
              <MyTextField
                rows={4}
                variant="outlined"
                name="team_participants"
                type="input"
                multiline
                inputProps={{
                  ...formStyle,
                  ...{
                    style: {
                      ...formStyle.style,
                      width: "100%",
                      padding: "0 20px 0 0",
                    },
                  },
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                placeholder="добавьте почты участников через пробел"
              />

              <MyLoadingButton
                variant="contained"
                type="submut"
                classNames={{ alignSelf: "center" }}
                loading={load}
              >
                Создать команду
              </MyLoadingButton>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};
export default CreateTeam;
