import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import cross from "../../img/Cross.svg";
import common from "../Dialog.module.scss";
import MyButton from "../../MyButton";
import { useNavigate } from "react-router-dom";

function Attachment() {
  console.log("Attachments open");
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Attachments open");
  }, []);
  const handleClose = () => {
    navigate(-1);
  };
  return (
    <Dialog
      onClose={handleClose}
      className="modal-central"
      open={true}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <div className={common.modal} style={{ width: "500px" }}>
        <MyButton
          src={cross}
          alt="закрыть"
          className="closeModal"
          handleClick={handleClose}
        />
        <h3>Вложения</h3>
      </div>
    </Dialog>
  );
}

export default Attachment;
