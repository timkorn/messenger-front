import { TextField } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useField } from "formik";

export const formStyle = {
  style: { color: "white", width: "250px" },
  autoComplete: "off",
  color: "white",
};
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
const styles2 = {
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
export const MyTextField = withStyles(styles)(function (props) {
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
      onChange={(event) => {
        field.onChange(event);
        /* props.onChange(event); */
      }}
    />
  );
});
export const MyTextField2 = withStyles(styles2)(function (props) {
  return (
    <TextField
      value={props.children}
      {...props}
      FormHelperTextProps={{
        style: { position: "absolute", bottom: "-20px", color: "red" },
      }}
      onChange={(event) => {
        props.onChange(event);
      }}
    />
  );
});
