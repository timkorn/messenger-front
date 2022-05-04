import { Formik, Field, Form, useField, ErrorMessage } from "formik";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { withStyles } from "@mui/styles";
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
const formStyle = {
  style: { color: "white", width: "250px" },
  autoComplete: "off",
  color: "white",
};

const loginShema = yup.object({
  email: yup
    .string()
    .email("Неправильный  формат почты")
    .required("Введите свою почту"),
  password: yup.string().required("Введите пароль"),
});
const styles = {
  root: {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "white",
      },
      "& fieldset": {
        borderColor: "grey",
      },
      "&.Mui-focused fieldset": {
        borderColor: "grey",
      },
    },
    "& .MuiFilledInput-root": {
      "& .MuiInput-underline:after": {
        borderBottomColor: "green",
      },
    },
  },
};
const MyTextField = withStyles(styles)(function (props) {
  const [field, meta, helpers] = useField(props.name);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      value={props.children}
      {...props}
      {...field}
      FormHelperTextProps={{
        style: { position: "absolute", bottom: "-20px" },
      }}
      helperText={errorText}
      error={!!errorText}
    />
  );
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
            Зарегестрироваться
          </Link>
        </div>
      </div>
    </ErrorBoundary>
  );
};
export { Login, MyTextField, formStyle };
