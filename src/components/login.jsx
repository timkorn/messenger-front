import { Formik, Field, Form, useField, ErrorMessage } from "formik";
import { TextField, Button } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import cross from "./img/Cross.svg";
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
  /*  .min(6, "Введите больше 6 символов")
    .max(20, "Введите не больше 20 символов")
    .matches(/^[A-Za-z0-9]+$/, "Формат: 1-9 и Aa-Zz") */
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
/* const MyTextField = (props) => {
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
}; */

const Login = () => {
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
            console.log(data);
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
