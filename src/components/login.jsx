import { Formik, Field, Form, useField, ErrorMessage } from "formik";
import { TextField, Button } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { withStyles } from "@material-ui/core/styles";

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
        borderColor: "grey",
      },
      "&.Mui-focused fieldset": {
        borderColor: "grey",
      },
    },
  },
};
const MyTextField = withStyles(styles)(function (props) {
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
});

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [path, setPath] = useState("");
  return (
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
            async function f(data) {
              try {
                const email = data.email;
                const password = data.password;
                let response = await fetch("http://localhost:8080/auth/login", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json;charset=utf-8",
                  },
                  body: JSON.stringify({ email, password }),
                });
                let result = await response.json();
                console.log(result);
              } catch (err) {
                setLoginError("неправильные логин или пароль");
              }
            }
            f(data);
          }}
        >
          {({ values, isSubmitting, errors }) => (
            <Form id="login-form">
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
              <MyTextField
                color="white"
                variant="filled"
                margin="normal"
                name="password"
                type="password"
                label="Пароль"
                inputProps={formStyle}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
              />
              <p className="loginError">{loginError}</p>

              <div>
                <Button id="regButton" variant="contained" type="submut">
                  Войти
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <Link to="/register" className="registerLink">
          Зарегестрироваться
        </Link>
      </div>
    </div>
  );
};
export { Login, MyTextField, formStyle };
