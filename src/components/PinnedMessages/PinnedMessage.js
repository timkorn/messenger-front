import Pin from "../img/Pin.svg";
import MyButton from "../MyButton";
import s from "./PinnedMessages.module.scss";
import Close from "../img/Cross.svg";
import ChatContext from "../../context/ChatContext";
import { useContext, useState } from "react";
import { Button } from "@mui/material";
import cn from "classnames";
function PinnedMessages() {
  let {
    chatRequest,
    deletePinRequest,
    makeNewPin,
    deletePin,
    searchOpen,
    searchValue,
    handleCloseSearch,
  } = useContext(ChatContext);
  const [delPin, setDelPin] = useState(false);
  const handleDelPin = () => {
    setDelPin(true);
  };
  return (
    <div className={s.all}>
      <div className={cn(s.root, searchOpen && s.search)}>
        {searchOpen && (
          <>
            <p style={{ marginLeft: "30px" }}>Поиск по строке: {searchValue}</p>
            <MyButton
              src={Close}
              className={s.close}
              handleClick={() => {
                handleCloseSearch(false);
              }}
            />
          </>
        )}
        {!searchOpen && (
          <>
            <div className={s.content}>
              {chatRequest ? (
                <>
                  <p>Новое закреплённое сообщение:</p>
                  <div className={s.text}>
                    <span>{chatRequest.name}</span>
                    <span className={s.message}>{chatRequest.message}</span>
                  </div>
                </>
              ) : (
                <>
                  <img src={Pin} />
                  <div className={s.text}>
                    <span>Тимур Корнилов</span>
                    <span className={s.message}>Всем привет!!!</span>
                  </div>
                </>
              )}
            </div>
            {chatRequest ? (
              <div className={s.newButtons}>
                <Button
                  style={{ fontSize: "12px" }}
                  onClick={makeNewPin}
                  variant="filled"
                >
                  Добавить
                </Button>
                <Button style={{ fontSize: "12px" }} onClick={deletePinRequest}>
                  отмена
                </Button>
              </div>
            ) : (
              <>
                {delPin ? (
                  <div className={s.newButtons}>
                    <Button
                      style={{ fontSize: "12px" }}
                      onClick={deletePin}
                      variant="filled"
                    >
                      Удалить
                    </Button>
                    <Button
                      style={{ fontSize: "12px" }}
                      onClick={() => {
                        setDelPin(false);
                      }}
                    >
                      отмена
                    </Button>
                  </div>
                ) : (
                  <MyButton
                    src={Close}
                    className={s.close}
                    handleClick={handleDelPin}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PinnedMessages;
