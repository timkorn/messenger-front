import React, { useEffect, useState } from "react";
import UniversalLoader from "../common/loader.jsx";
import search from "../img/search.svg";
import isnew from "../img/new.svg";
import MyButton from "../MyButton";
import LineDivision from "../LineDivision";
function Conversations() {
  const [isLoading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const url = "https://api.randomuser.me/?results=5";
      const response = await fetch(url);
      const data = await response.json();
      setChats(data.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="chats-list">
      <header className="chats-list__header">
        <h4>Сообщения</h4>
        <div className="chats-list__header-imgs">
          <MyButton src={search} alt="Поиск" />
          <MyButton src={isnew} alt="Добавить" />
        </div>
      </header>
      <LineDivision
        style={{
          marginBottom: "15px",
        }}
      />
      <main className="chats-list__main">
        {isLoading || !chats ? (
          <UniversalLoader size={30} />
        ) : (
          chats.map((item, i) => (
            <div key={item} className="chats-item">
              <MessageItem
                name={item.name.first}
                pic={item.picture.large}
                text={i}
              />
            </div>
          ))
        )}
      </main>
    </div>
  );
}

function MessageItem(props) {
  return (
    <div className="mes-item-wrapper">
      <img className="chats-item__picture" src={props.pic} alt="автар" />
      <div className="chats-item__main">
        <div className="chats-item__main-header">{props.name}</div>
        <p className="chats-item__main-text">aslfmaslcm;sam;qwelmfc;wef</p>
      </div>
      <time>
        <span className="chats-item__time">16:00</span>
      </time>
    </div>
  );
}
export default Conversations;
