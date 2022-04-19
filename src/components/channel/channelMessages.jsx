import React, { useEffect, useState } from "react";
import UniversalLoader from "../common/loader.jsx";
function ChannelMessages(props) {
  const [person, setPerson] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const url = "https://api.randomuser.me/?results=50";
      const response = await fetch(url);
      const data = await response.json();
      setPerson(data.results);
      setLoading(false);
    }
    fetchData();
  }, []);
  if (isLoading || !person) {
    return <UniversalLoader size={35} />;
  } else {
    return (
      <div id="chan-list-mes">
        {person.map((item, i) => (
          <div key={item.name.first + i}>
            <ChannelMessage
              name={item.name.first}
              pic={item.picture.large}
              text={i}
            />
          </div>
        ))}
      </div>
    );
  }
}
function ChannelMessage(props) {
  return (
    <div className="channel-message" key={props.name}>
      <div className="channel-message__ava">
        <img className="channel-message__img" src={props.pic} alt="Аватарка" />
      </div>
      <div>
        <div className="channel-message__title">
          <div>{props.name}</div>
          <span className="channel-message__time">18:00</span>
        </div>
        <p className="channel-message__body">{props.text}</p>
      </div>
    </div>
  );
}
export default ChannelMessages;
