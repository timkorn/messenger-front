import s from "./CreateChannel.module.scss";
import common from "../Dialog.module.scss";
import { Dialog } from "@mui/material";
import MyButton from "../../MyButton";
import { Form, Formik } from "formik";
import * as yup from "yup";
import cross from "../../img/Cross.svg";
import cn from "classnames";
import { MyTextField } from "../../login.jsx";
import { useEffect, useState } from "react";
import MyLoadingButton from "../../MyLoadingButton";

const formStyle = {
  style: { color: "white", width: "250px", padding: "10px 10px" },
  autoComplete: "off",
};
const channelShema = yup.object({
  name: yup.string().required("Введите имя"),

  description: yup
    .string()
    .required("поле не заполнено")
    .max(220, "превышен лимит символов(220)"),
});
function CreateChannel({ handleClose, open }) {
  const [loading, setLoading] = useState(false);
  return (
    <Dialog
      onClose={handleClose}
      className="modal-central"
      open={open}
      /* aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description" */
    >
      <div className={cn(common.modal)} style={{ width: "500px" }}>
        <MyButton
          src={cross}
          alt="закрыть"
          className="closeModal"
          handleClick={handleClose}
        />
        <h3>Создание канала</h3>
        <Formik
          initialValues={{
            name: "",
            description: "",
          }}
          validationSchema={channelShema}
          onSubmit={(data) => {
            setLoading(true);
            async function createChannel(data) {
              let name = data.name;
              let id = 0;
              let description = data.description;
              let response = await fetch(
                "http://localhost:8080/channels/create",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ name, id, description }),
                }
              );
            }
          }}
        >
          {({ values, isSubmitting, errors }) => (
            <Form id="create-channel-form">
              <p>Придумайте название</p>
              {/* <MyTextField
                  variant="outlined"
                  name="name"
                  inputProps={formStyle}
                /> */}
              <MyTextField
                variant="outlined"
                style={{ color: "white" }}
                name="name"
                type="input"
                inputProps={formStyle}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                placeholder="название"
              />
              <p style={{ marginTop: "30px" }}>Добавьте описание</p>
              {/* <MyTextField
                  variant="outlined"
                  name="description"
                  inputProps={formStyle}
                /> */}
              <MyTextField
                rows={4}
                variant="outlined"
                name="description"
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
                placeholder="описание"
              />
              <MyLoadingButton
                variant="contained"
                type="submut"
                loading={loading}
              >
                Создать канал
              </MyLoadingButton>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
}

export default CreateChannel;
