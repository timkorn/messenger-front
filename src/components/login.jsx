import { Formik, Field, Form, useField, ErrorMessage } from "formik";
import { Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { MyTextField, formStyle } from "./MyTextField/MyTextField.js";
import { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";
import MyLoadingButton from "./MyLoadingButton";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const loginShema = yup.object({
  email: yup
    .string()
    .email("Неправильный  формат почты")
    .required("Введите свою почту"),
  password: yup.string().required("Введите пароль"),
});

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const { loginUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div id="login-wrapper">
        <div id="register-container">
          <h1>Вход</h1>

          <Formik
            id="register-form"
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginShema}
            onSubmit={(data) => {
              setLoginError(false);
              setLoading(true);
              loginUser(data).catch((err) => {
                setLoading(false);
                setLoginError("неправильные логин или пароль");
              });
            }}
          >
            {({ values, isSubmitting, errors }) => (
              <Form id="login-form">
                <MyTextField
                  margin="normal"
                  variant="filled"
                  label={"Почта"}
                  name="email"
                  type="input"
                  inputProps={formStyle}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                />
                <MyTextField
                  margin="normal"
                  variant="filled"
                  name="password"
                  type="password"
                  label={"Пароль"}
                  inputProps={formStyle}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                />
                <p className="loginError">{loginError}</p>

                <div>
                  <MyLoadingButton loading={loading}>Войти</MyLoadingButton>
                </div>
              </Form>
            )}
          </Formik>
          <Link to="/register" className="registerLink">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </ErrorBoundary>
  );
};
export { Login, MyTextField, formStyle };
