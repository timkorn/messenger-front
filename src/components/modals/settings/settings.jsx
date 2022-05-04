import s from "./settings.module.scss";
import { Button, Modal } from "@mui/material";
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
import common from "../Modal.module.scss";
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

  description: yup
    .string()
    .required("поле не заполнено")
    .max(220, "превышен лимит символов(220)"),
});
let profileData = {
  photo: defaultImg,
  name: "Timur Kornilov",
  password: "123456",
};
let passwData, nameData, photoData;
const Settings = ({ handleClose, open }) => {
  const [showPasswField, setShowPasswField] = useState(false);
  const handlePassw = () => {
    setShowPasswField(true);
  };
  useEffect(() => {
    passwData = profileData.password;
    nameData = profileData.name;
    photoData = profileData.photo;
  }, []);
  return (
    <Modal
      onClose={handleClose}
      className="modal-central"
      open={open}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <div className={cn(s.settings, common.modal)}>
        <MyButton
          src={cross}
          alt="закрыть"
          className="closeModal"
          handleClick={handleClose}
        />
        <div style={{ position: "relative" }}>
          <h3 className={s.mainTittle}>Настройки аккаунта</h3>
        </div>
        <LineDivision />
        <Formik
          initialValues={{
            photo: photoData,
            name: nameData,
            oldPassword: "",
            newPassword: "",
          }}
          validationSchema={settingsShema}
          onSubmit={(data) => {
            console.log(data);
          }}
        >
          {({ values, isSubmitting, errors }) => (
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
                        onChange={(event) => {
                          const reader = new FileReader();
                          const files = event.target.files[0];
                          values.photo = files;
                          reader.readAsDataURL(files);
                          reader.onload = function (event) {
                            values.photo = event.target.result;
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
                        style={{ color: "white", marginTop: "10px" }}
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
                    >
                      Изменить пароль
                    </Button>
                  )}
                </div>
              </div>
              <MyLoadingButton
                classNames={{
                  alignSelf: "flex-end",
                  position: "absolute",
                  bottom: "25px",
                  right: "45px",
                  margin: "0 0",
                  fontSize: "13px",
                }}
              >
                обновить
              </MyLoadingButton>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
export default Settings;
