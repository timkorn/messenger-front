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

const formStyle = {
  style: { color: "white", width: "250px", padding: "10px 10px" },
  autoComplete: "off",
  color: "white",
};

function AddPerson({ handleClose, open }) {
  const { logout, authTokens } = useContext(AuthContext);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

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
        <h3>Добавление участников</h3>
        <Formik
          initialValues={{
            team_participants: "",
          }}
          onSubmit={(data) => {
            setLoad(true);
            async function create(data) {
              const team_participants = data.team_participants;
              const name = data.name;
              let response = await fetch(
                "http://localhost:8080/teams/addPerson",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: String(authTokens.accessToken),
                  },
                  body: JSON.stringify({ name, team_participants }),
                }
              );
              let result = await response.json();
              if (response.status === 200) {
                setLoad(false);
                handleClose();
                navigate(`/${result.id}`);
              } else if (result.error === "Unauthorized") {
                logout();
              } else {
                throw new Error();
              }
            }

            create(data).catch((err) => {
              setLoad(false);
              handleClose();
            });
          }}
        >
          {({ values, isSubmitting, errors }) => (
            <Form id="create-channel-form">
              <MyTextField
                rows={4}
                variant="outlined"
                name="team_participants"
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
