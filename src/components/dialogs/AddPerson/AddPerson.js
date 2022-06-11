import common from "../Dialog.module.scss";
import { Dialog } from "@mui/material";
import MyButton from "../../MyButton";
import { Form, Formik } from "formik";
import * as yup from "yup";
import cross from "../../img/Cross.svg";
import cn from "classnames";
import { MyTextField } from "../../login.jsx";
import { useEffect, useState, useContext } from "react";
import LineDivision from "../../LineDivision";
import MyLoadingButton from "../../MyLoadingButton";
import { LayoutGroupContext } from "framer-motion";
import AuthContext from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TeamContext from "../../../context/TeamContext";

const formStyle = {
  style: { color: "white", width: "250px", padding: "10px 10px" },
  autoComplete: "off",
  color: "white",
};

function AddPerson({ handleClose, open }) {
  const { currentTeam } = useContext(TeamContext);
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [load, setLoad] = useState(false);
  const [addPersonError, setAddPersonError] = useState("");
  useEffect(() => {
    if (!open) {
      if (addPersonError) {
        setAddPersonError("");
      }
    }
  }, [open]);
  return (
    <Dialog
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
        <h3 style={{ marginBottom: "30px" }}>Добавление участников</h3>
        {addPersonError && (
          <p className="loginError" style={{ top: "40px" }}>
            {addPersonError}
          </p>
        )}
        <Formik
          initialValues={{
            participants: "",
          }}
          onSubmit={(data) => {
            setLoad(true);
            setAddPersonError("");
            async function addPerson(data) {
              const participants = data.participants;
              let response = await fetch(
                "http://localhost:8080/teams/addPerson",
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: String(authTokens.accessToken),
                  },
                  body: JSON.stringify({
                    team_id: currentTeam,
                    participants,
                  }),
                }
              );
              if (response.status === 200) {
                setLoad(false);
                handleClose();
              } else {
                let result = await response.json();
                if (result.error === "Unauthorized") {
                  logoutUser();
                }
                throw new Error();
              }
            }
            addPerson(data).catch((err) => {
              setLoad(false);
              setAddPersonError("email введён некорректно");
            });
          }}
        >
          {({ values, isSubmitting, errors }) => (
            <Form id="create-channel-form">
              <MyTextField
                rows={4}
                variant="outlined"
                name="participants"
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
                variant="contained"
                type="submut"
                classNames={{ alignSelf: "center" }}
                loading={load}
              >
                Добавить
              </MyLoadingButton>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
}

export default AddPerson;
