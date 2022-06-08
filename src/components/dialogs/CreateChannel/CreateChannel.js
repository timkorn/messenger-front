import s from "./CreateChannel.module.scss";
import common from "../Dialog.module.scss";
import { Dialog } from "@mui/material";
import MyButton from "../../MyButton";
import { Form, Formik } from "formik";
import * as yup from "yup";
import cross from "../../img/Cross.svg";
import cn from "classnames";
import { MyTextField } from "../../login.jsx";
import { useContext, useEffect, useState } from "react";
import MyLoadingButton from "../../MyLoadingButton";
import AuthContext from "../../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import TeamContext from "../../../context/TeamContext";

const formStyle = {
  style: { color: "white", width: "250px", padding: "10px 10px" },
  autoComplete: "off",
};
const channelShema = yup.object({
  name: yup
    .string()
    .required("Введите имя")
    .max(15, "Введите не больше 15 символов"),
});
function CreateChannel({ handleClose, open, id }) {
  const [load, setLoad] = useState(false);
  const { authTokens, logout } = useContext(AuthContext);
  const [createChannelError, setCreateChannelError] = useState("");
  const { showChannels } = useContext(TeamContext);
  useEffect(() => {
    if (!open) {
      if (createChannelError) {
        setCreateChannelError("");
      }
    }
  }, [open]);
  return (
    <Dialog onClose={handleClose} className="modal-central" open={open}>
      <div className={cn(common.modal)} style={{ width: "500px" }}>
        <MyButton
          src={cross}
          alt="закрыть"
          className="closeModal"
          handleClick={handleClose}
        />
        <h3>Создание канала</h3>
        {createChannelError && (
          <p className="loginError" style={{ top: "40px" }}>
            {createChannelError}
          </p>
        )}
        <Formik
          initialValues={{
            name: "",
          }}
          validationSchema={channelShema}
          onSubmit={(data) => {
            setLoad(true);
            setCreateChannelError("");

            async function createChannelInTeam(data) {
              let name = data.name;

              let response = await fetch(
                "http://localhost:8080/chat/createChannel",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: String(authTokens.accessToken),
                  },
                  body: JSON.stringify({ name, team_id: id }),
                }
              );
              if (response.status === 200) {
                setLoad(false);
                handleClose();
                showChannels();
              } else {
                let result = await response.json();
                if (result.error === "Unauthorized") {
                  logout();
                }
                throw new Error();
              }
            }
            createChannelInTeam(data).catch((err) => {
              setLoad(false);
              setCreateChannelError("Канал с таким названием уже существует");
            });
          }}
        >
          {({ values, isSubmitting, errors }) => (
            <Form id="create-channel-form">
              <p>Придумайте название</p>

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

              <MyLoadingButton
                variant="contained"
                type="submut"
                classNames={{ alignSelf: "center" }}
                loading={load}
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
