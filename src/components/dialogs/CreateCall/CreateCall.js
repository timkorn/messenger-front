import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import cross from "../../img/Cross.svg";
import common from "../Dialog.module.scss";
import MyButton from "../../MyButton";
import { useNavigate } from "react-router-dom";
import { MyTextField2 } from "../../MyTextField/MyTextField";
import MyLoadingButton from "../../MyLoadingButton";
function CreateCall() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    console.log("Attachments open");
  }, []);
  const handleClose = () => {
    navigate(-1);
  };
  const handleCallSubmit = (event) => {
    setError("");
    event.preventDefault();
    if (name === "") {
      setError("Заполните поле");
    } else if (name.length >= 20) {
      setError("Введите меньше 20 символов");
    } else {
      console.log("request on creation");
    }
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  return (
    <Dialog
      onClose={handleClose}
      className="modal-central"
      open={true}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <div className={common.modal} style={{ width: "400px" }}>
        <MyButton
          src={cross}
          alt="закрыть"
          className="closeModal"
          handleClick={handleClose}
        />
        <h3 style={{ marginBottom: "60px" }}>Создать аудиозвонок</h3>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            height: "200px",
          }}
          onSubmit={handleCallSubmit}
        >
          <div>
            <h4>Название</h4>
            <MyTextField2
              inputProps={{
                style: { color: "#fff" },
              }}
              value={name}
              onChange={handleNameChange}
              helperText={error}
            />
          </div>
          <MyLoadingButton type="submit">Начать звонок</MyLoadingButton>
        </form>
      </div>
    </Dialog>
  );
}

export default CreateCall;
