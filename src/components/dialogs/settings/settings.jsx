import s from "./settings.module.scss";
import { Button, Dialog } from "@mui/material";
import MyButton from "../../MyButton";
import { Form, Formik } from "formik";
import * as yup from "yup";
import cross from "../../img/Cross.svg";
import cn from "classnames";
import { MyTextField } from "../../login.jsx";
import { useEffect, useState } from "react";
import defaultImg from "../../img/ava.png";
import LineDivision from "../../LineDivision";
import MyLoadingButton from "../../MyLoadingButton";
import common from "../Dialog.module.scss";
import AuthContext from "../../../context/AuthContext";
import { useContext } from "react";
import UniversalLoader from "../../common/loader";
const formStyle = {
  style: { color: "white", width: "250px", padding: "10px 10px" },
  autoComplete: "off",
  color: "white",
};

const settingsShema = yup.object({
  name: yup
    .string()
    .required("поле не заполнено")
    .max(20, "превышен лимит символов(20)"),
  oldPassword: yup.string().max(20, "превышен лимит символов(20)"),
  newPassword: yup
    .string()
    .min(6, "Введите больше 6 символов")
    .max(20, "Введите не больше 20 символов")
    .matches(/^[A-Za-z0-9]+$/, "Формат: 1-9 и Aa-Zz"),
});

const Settings = ({ handleClose, open }) => {
  const [disabled, setDisabled] = useState(true);
  const [showPasswField, setShowPasswField] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [userData, setUserData] = useState(false);
  const { authTokens, changeData } = useContext(AuthContext);
  const [loadSettingsButton, setLoadSettingsButton] = useState(false);
  const [settinsError, setSettinsError] = useState("");
  const handlePassw = () => {
    setShowPasswField(true);
  };

  let getUser = async () => {
    let response = await fetch("http://localhost:8080/chat/getUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(authTokens.accessToken),
      },
    });
    let result = await response.json();
    if (response.status === 200) {
      try {
        return result;
      } catch (err) {
        throw new Error();
      }
    } else {
      throw new Error();
    }
  };
  useEffect(() => {
    if (!open) {
      setSettingsLoading(true);
      setSettinsError("");
    } else {
      getUser().then((item) => {
        setUserData(item);
        setSettingsLoading(false);
      });
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
      {settingsLoading ? (
        <UniversalLoader size={30} />
      ) : (
        <div className={cn(common.modal, s.settings)}>
          <MyButton
            src={cross}
            alt="закрыть"
            className="closeModal"
            handleClick={handleClose}
          />
          <div style={{ position: "relative" }}>
            <h3 className={s.mainTittle}>Настройки аккаунта</h3>
          </div>
          {settinsError && (
            <p className="loginError" style={{ top: "35px" }}>
              {settinsError}
            </p>
          )}
          <LineDivision />
          <Formik
            initialValues={{
              photo: userData.avatar,
              name: userData.username,
              oldPassword: "",
              newPassword: "",
            }}
            validate={(values) => {
              if (disabled) {
                if (
                  values.name !== userData.username ||
                  values.oldPassword !== "" ||
                  values.newPassword !== "" ||
                  values.photo !== userData.avatar
                ) {
                  setDisabled(false);
                }
              } else {
                if (
                  values.name === userData.username &&
                  values.oldPassword === "" &&
                  values.newPassword === "" &&
                  values.photo === userData.avatar
                ) {
                  setDisabled(true);
                }
              }
            }}
            validationSchema={settingsShema}
            onSubmit={(data) => {
              setLoadSettingsButton(true);
              changeData(
                data,
                data.photo === userData.avatar,
                data.name === userData.username
              )
                .then(() => {
                  setLoadSettingsButton(false);
                  handleClose();
                })
                .catch((err) => {
                  setLoadSettingsButton(false);
                  setSettinsError("Неправильный пароль");
                });
            }}
          >
            {({ values, handleReset, errors, setFieldValue }) => (
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
                <div className={s.textForm}>
                  <div>
                    <h4>Имя</h4>
                    <MyTextField
                      variant="outlined"
                      style={{ color: "white" }}
                      name="name"
                      type="input"
                      inputProps={formStyle}
                      InputLabelProps={{
                        style: { color: "#fff" },
                      }}
                      placeholder="имя"
                    >
                      {values.name}
                    </MyTextField>
                  </div>
                  <div>
                    <h4>Пароль</h4>

                    {showPasswField ? (
                      <div className={s.passwField}>
                        <MyTextField
                          variant="outlined"
                          style={{ color: "white" }}
                          name="oldPassword"
                          type="password"
                          inputProps={formStyle}
                          InputLabelProps={{
                            style: { color: "#fff" },
                          }}
                          placeholder="старый пароль"
                        />
                        <MyTextField
                          variant="outlined"
                          style={{ color: "white", marginTop: "20px" }}
                          type="password"
                          name="newPassword"
                          inputProps={formStyle}
                          InputLabelProps={{
                            style: { color: "#fff" },
                          }}
                          placeholder="новый пароль"
                        />
                      </div>
                    ) : (
                      <Button
                        variant="outlined"
                        component="label"
                        className={s.button}
                        onClick={handlePassw}
                        style={{ marginTop: "10px", fontSize: "10px" }}
                        type="button"
                      >
                        Изменить пароль
                      </Button>
                    )}
                  </div>
                </div>
                {!disabled && (
                  <Button
                    onClick={() => {
                      handleReset();
                      setDisabled(true);
                    }}
                    type="button"
                    style={{
                      position: "absolute",
                      bottom: "25px",
                      right: "185px",
                      margin: "0 0",
                      fontSize: "13.7px",
                      color: "#519872",
                    }}
                  >
                    отмена
                  </Button>
                )}
                <MyLoadingButton
                  classNames={{
                    alignSelf: "flex-end",
                    position: "absolute",
                    bottom: "25px",
                    right: "45px",
                    margin: "0 0",
                    fontSize: "13.7px",
                  }}
                  disabled={disabled}
                  loading={loadSettingsButton}
                  type="submit"
                >
                  обновить
                </MyLoadingButton>
                {/* {JSON.stringify(values.newPassword)} */}
              </Form>
            )}
          </Formik>
        </div>
      )}
    </Dialog>
  );
};
export default Settings;
