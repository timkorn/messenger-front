import common from "../Dialog.module.scss";
import { Dialog } from "@mui/material";
import MyButton from "../../MyButton";
import Ava from "../../img/ava.png";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import MicroOn from "../../img/Microphone.svg";
import MicroOff from "../../img/Microphone-off.svg";
import cn from "classnames";
import cross from "../../img/Cross.svg";
import { Modal } from "@mui/material";
import LineDivision from "../../LineDivision";
import s from "./AudioCall.module.scss";

function AudioCall({}) {
  const navigate = useNavigate();
  const [micro, setMicro] = useState(false);
  const handleOnMicro = () => {
    setMicro(true);
  };
  const handleOffMicro = () => {
    setMicro(false);
  };
  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Modal
      /* onClose={handleClose} */
      className="modal-central"
      open={true}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <div className={cn(common.modal)} style={{ width: "697px" }}>
        <h3>Аудиозвонок</h3>
        <LineDivision />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            maxHeight: "300px",
            overflowY: "scroll",
            backgroundColor: "#0f0f10",
          }}
        >
          <AudioPerson name="Timur Kornilov" ava={Ava} micro={false} />
          <AudioPerson name="Timur Kornilov" ava={Ava} micro={false} />
          <AudioPerson name="Timur Kornilov" ava={Ava} micro={false} />
          <AudioPerson name="Timur Kornilov" ava={Ava} micro={false} />
          <AudioPerson name="Timur Kornilov" ava={Ava} micro={false} />
          <AudioPerson name="Timur Kornilov" ava={Ava} micro={false} />
          <AudioPerson name="Timur Kornilov" ava={Ava} micro={false} />
          <AudioPerson name="Timur Kornilov" ava={Ava} micro={false} />
          <AudioPerson name="Timur Kornilov" ava={Ava} micro={false} />
          <AudioPerson name="Timur Kornilov" ava={Ava} micro={false} />
          <AudioPerson name="Timur Kornilov" ava={Ava} micro={false} />
          <AudioPerson name="Timur Kornilov" ava={Ava} micro={false} />
          <AudioPerson name="Timur Kornilov" ava={Ava} micro={false} />
          <AudioPerson name="Timur Kornilov" ava={Ava} micro={false} />
          <AudioPerson name="Timur Kornilov" ava={Ava} micro={false} />
          <AudioPerson name="Timur Kornilov" ava={Ava} micro={false} />
          <AudioPerson name="Timur Kornilov" ava={Ava} micro={false} />
          <AudioPerson name="Timur Kornilov" ava={Ava} micro={false} />
          <AudioPerson name="Timur Kornilov" ava={Ava} micro={false} />
          <AudioPerson name="Timur Kornilov" ava={Ava} micro={false} />
          <AudioPerson name="Timur Kornilov" ava={Ava} micro={false} />
        </div>
        <LineDivision />
        <div className={s.f}>
          {/* <div
            style={{
              backgroundColor: "grey",
            }}
            onClick={micro ? handleOnMicro : handleOffMicro}
          >
            <img src={micro ? MicroOn : MicroOff} height="40px" />
          </div>
          <div
            style={{
              backgroundColor: "grey",
            }}
            onClick={micro ? handleOnMicro : handleOffMicro}
          >
            <img src={micro ? MicroOn : MicroOff} height="40px" />
          </div> */}
        </div>
      </div>
    </Modal>
  );
}

function AudioPerson({ name, ava, micro }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "15px",
      }}
    >
      <div style={{ position: "relative" }}>
        <img src={ava} style={{ width: "50px" }} />
        {!micro && (
          <div
            style={{
              height: "18px",
              width: "18px",
              backgroundColor: "white",
              position: "absolute",
              bottom: "-5px",
              right: "-10px",
              borderRadius: "100px",
            }}
          >
            <img
              src={MicroOff}
              style={{
                height: "18px",
              }}
            />
          </div>
        )}
      </div>
      <p
        style={{
          fontSize: "12px",
        }}
      >
        {name}
      </p>
    </div>
  );
}

export default AudioCall;
