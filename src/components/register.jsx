import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import eyeClosed from "./img/Eye-closed.svg";
import eyeOp from "./img/Eye.svg";
import AuthContext from "../context/AuthContext.jsx";
import { useContext } from "react";
import MyLoadingButton from "./MyLoadingButton";
import { MyTextField } from "./MyTextField/MyTextField.js";
import Ava from "./startImages/person.png";
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
  password: yup
    .string()
    .required("Введите пароль")
    .min(6, "Введите больше 6 символов")
    .max(20, "Введите не больше 20 символов")
    .matches(/^[A-Za-z0-9]+$/, "Формат: 1-9 и Aa-Zz"),
});

const Register = () => {
  const [path, setPath] = useState("");
  const [eye, setEye] = useState(false);
  const { registerUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");

  return (
    <div id="login-wrapper">
      <div id="register-container">
        <h1>Регистрация</h1>
        <p style={{ color: "#f44336", fontSize: "12px" }}>{registerError}</p>
        <Formik
          id="register-form"
          initialValues={{
            name: "",
            email: "",
            password: "",
            avatar: Ava,
          }}
          validationSchema={registerShema}
          onSubmit={(data) => {
            setRegisterError(false);
            setLoading(true);
            registerUser(data).catch((err) => {
              setLoading(false);
              setRegisterError("Этот email уже был использован");
            });
          }}
        >
          {({ values, isSubmitting, errors }) => (
            <Form id="login-form">
              <MyTextField
                margin="normal"
                variant="filled"
                name="name"
                type="input"
                label={"Имя"}
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
                label={"Почта"}
                inputProps={formStyle}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
              />
              <div className="eyeButtnCont">
                <MyTextField
                  margin="normal"
                  variant="filled"
                  style={{ color: "white" }}
                  name="password"
                  type={eye ? "input" : "password"}
                  label={"Пароль"}
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
              <MyLoadingButton loading={loading}>
                Зарегистрироваться
              </MyLoadingButton>
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
