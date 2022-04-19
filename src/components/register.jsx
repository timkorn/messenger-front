import { Formik, Field, Form, useField, ErrorMessage } from "formik";
import { TextField, Button } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import eyeOp from "./img/Eye.svg";
import eyeClosed from "./img/Eye-closed.svg";
import cross from "./img/Cross.svg";
import * as yup from "yup";
import arrow from "./img/Arrow left.svg";
const formStyle = {
  style: { color: "white", width: "250px" },
  autoComplete: "off",
  color: "white",
};

const registerShema = yup.object({
  email: yup
    .string()
    .email("Неправильный  формат почты")
    .required("Введите свою почту"),
  name: yup.string().required("Введите своё имя"),
  surname: yup.string().required("Введите свою фамилию"),
  password: yup
    .string()
    .required("Введите пароль")
    .min(6, "Введите больше 6 символов")
    .max(20, "Введите не больше 20 символов")
    .matches(/^[A-Za-z0-9]+$/, "Формат: 1-9 и Aa-Zz"),
});

const MyTextField = (props) => {
  const [field, meta, helpers] = useField(props.name);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...props}
      {...field}
      FormHelperTextProps={{
        style: { position: "absolute", bottom: "-20px" },
      }}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const Register = () => {
  const [path, setPath] = useState("");
  const [eye, setEye] = useState(false);
  return (
    <div id="login-wrapper">
      <div id="register-container">
        <h1>Регистрация</h1>

        <Formik
          id="register-form"
          initialValues={{
            name: "",
            surname: "",
            email: "",
            password: "",
            photo: "",
            path: "",
          }}
          validationSchema={registerShema}
          onSubmit={(data) => {
            console.log(data);
          }}
        >
          {({ values, isSubmitting, errors }) => (
            <Form id="login-form">
              <MyTextField
                margin="normal"
                variant="filled"
                style={{ color: "white" }}
                name="name"
                type="input"
                label="Имя"
                inputProps={formStyle}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
              />

              <MyTextField
                margin="normal"
                variant="filled"
                style={{ color: "white" }}
                name="surname"
                type="input"
                label="Фамилия"
                inputProps={formStyle}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
              />

              <MyTextField
                margin="normal"
                variant="filled"
                style={{ color: "white" }}
                name="email"
                type="input"
                label="Почта"
                inputProps={formStyle}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
              />
              <div className="eyeButtnCont">
                <MyTextField
                  color="white"
                  variant="filled"
                  margin="normal"
                  name="password"
                  type={eye ? "input" : "password"}
                  label="Пароль"
                  inputProps={formStyle}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                />
                <img
                  src={eye ? eyeClosed : eyeOp}
                  className="eyeButtn"
                  onClick={() => {
                    setEye(!eye);
                  }}
                />
              </div>
              <div>
                <Button variant="contained" component="label" id="photo-button">
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
                      event.target.value = "";
                      reader.onload = function (event) {
                        values.path = event.target.result;
                        setPath(event.target.result);
                      };
                    }}
                  />
                </Button>
              </div>
              {values.path ? (
                <div id="prewatchPhoto">
                  <img
                    id="reg-photo"
                    src={values.path}
                    width="50px"
                    height="50px"
                  />
                  <button
                    id="delete-icon"
                    onClick={() => {
                      values.path = "";
                      setPath("");
                    }}
                  >
                    <img src={cross} id="del-prewatch" />
                  </button>
                </div>
              ) : null}
              <div>
                <Button id="regButton" variant="contained" type="submut">
                  Зарегестрироваться
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <Link className="loginLinkCont" to="/login">
          <p className="loginLink">Войти</p>
        </Link>
      </div>
    </div>
  );
};
export default Register;
