import s from "./CreateTeam.module.scss";
import common from "../Modal.module.scss";
import { Modal } from "@mui/material";
import MyButton from "../../MyButton";
import { Form, Formik } from "formik";
import * as yup from "yup";
import cross from "../../img/Cross.svg";
import cn from "classnames";
import { MyTextField } from "../../login.jsx";
import { useEffect, useState } from "react";
import LineDivision from "../../LineDivision";
import MyLoadingButton from "../../MyLoadingButton";
const formStyle = {
  style: { color: "white", width: "250px", padding: "10px 10px" },
  autoComplete: "off",
  color: "white",
};
const createTeamShema = yup.object({
  name: yup
    .string()
    .required("поле не заполнено")
    .max(20, "превышен лимит символов(20)"),
});
const CreateTeam = ({ handleClose, open }) => {
  return (
    <Modal
      onClose={handleClose}
      className="modal-central"
      open={open}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <div className={cn(common.modal)} style={{ width: "500px" }}>
        <MyButton
          src={cross}
          alt="закрыть"
          className="closeModal"
          handleClick={handleClose}
        />
        <h3>Создание команды</h3>
        <Formik
          initialValues={{
            name: "",
            emails: "",
          }}
          validationSchema={createTeamShema}
          /* onSubmit={(data) => {
            console.log(data);
          }} */
        >
          {({ values, isSubmitting, errors }) => (
            <Form id="create-channel-form">
              <MyTextField
                margin="normal"
                variant="outlined"
                name="name"
                type="input"
                inputProps={{
                  ...formStyle,
                  style: { ...formStyle.style, width: "100%" },
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                placeholder="название"
              />
              <p style={{ paddingBottom: "10px", paddingTop: "15px" }}>
                Добавление участников
              </p>
              <MyTextField
                rows={4}
                variant="outlined"
                name="emails"
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
                placeholder="добавьте почты участников через пробел"
              />

              <MyLoadingButton
                id="create-chan-button"
                variant="contained"
                type="submut"
                classNames={{ alignSelf: "center" }}
              >
                Создать канал
              </MyLoadingButton>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
export default CreateTeam;
