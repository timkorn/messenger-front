import Add from "./img/add.svg";
import Arrow from "./img/Arrow left.svg";
import Cross from "./img/Cross.svg";
import Edit from "./img/Edit-alt.svg";
import Eye from "./img/Eye-closed.svg";
import Hashtag from "./img/hashtag.svg";
import Menu from "./img/Menu.svg";
import MicrophoneOn from "./img/Microphone.svg";
import MicrophoneOff from "./img/Microphone-off.svg";
import New from "./img/new.svg";
import Notif from "./img/Notification.svg";
import Phone from "./img/phone.svg";
import Pin from "./img/Pin.svg";
import Plus from "./img/Plus.svg";
import Points from "./img/points.svg";
import Reply from "./img/Reply.svg";
import Search from "./img/search.svg";
import Send from "./img/send.svg";
import Settings from "./img/Settings-alt.svg";
import VolumeOff from "./img/Volume-down.svg";
import VolumeOn from "./img/Volume-off.svg";
import ArrowDown from "./sidebar/img/arrow.svg";
import Chosen from "./sidebar/img/chosen.svg";
import Comment from "./sidebar/img/Comment.svg";
import Feed from "./sidebar/img/feed.svg";
import Group from "./sidebar/img/Group.svg";
import Logout from "./sidebar/img/Logout.svg";
import { useEffect } from "react";
function Data() {
  return (
    <div style={{ display: "none", position: "absolute" }}>
      <img src={Add} />
      <img src={Arrow} />
      <img src={Cross} />
      <img src={Edit} />
      <img src={Eye} />
      <img src={Hashtag} />
      <img src={Menu} />
      <img src={MicrophoneOn} />
      <img src={MicrophoneOff} />
      <img src={New} />
      <img src={Notif} />
      <img src={Phone} />
      <img src={Pin} />
      <img src={Plus} />
      <img src={Points} />
      <img src={Reply} />
      <img src={VolumeOn} />
      <img src={VolumeOff} />
      <img src={Settings} />
      <img src={Send} />
      <img src={Search} />
      <img src={Chosen} />
      <img src={Comment} />
      <img src={Feed} />
      <img src={Group} />
      <img src={Logout} />
      <img src={ArrowDown} />
    </div>
  );
}

export default Data;
