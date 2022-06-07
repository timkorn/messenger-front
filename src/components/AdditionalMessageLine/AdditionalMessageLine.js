import s from "./AdditionalMessageLine.module.scss";
import MyButton from "../MyButton";
import Cross from "../img/Cross.svg";
import Rep from "../img/Reply.svg";
import ChatContext from "../../context/ChatContext";
import { useContext } from "react";
import Redactor from "../img/Edit-alt.svg";
function AdditionalMessageLine({ element }) {
  let { deleteReply, deleteRed, typeAddMesField } = useContext(ChatContext);
  return (
    <div className={s.root}>
      <div className={s.main}>
        <div className={s.relpy}>
          {typeAddMesField === "reply" ? (
            <img src={Rep} />
          ) : (
            <img src={Redactor} />
          )}
        </div>
        <div className={s.text}>
          <span style={{ fontSize: "14px", marginBottom: "5px" }}>
            {element.name}
          </span>
          <span style={{ fontSize: "12px" }}>{element.message}</span>
        </div>
      </div>
      <div className={s.deleteButton}>
        {typeAddMesField === "reply" ? (
          <MyButton src={Cross} handleClick={deleteReply} />
        ) : (
          <MyButton src={Cross} handleClick={deleteRed} />
        )}
      </div>
    </div>
  );
}

export default AdditionalMessageLine;
