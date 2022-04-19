import Channel from "./channel/channel.jsx";
import Sidebar from "./sidebar/sidebar.jsx";
function Channels() {
  function scrollDown() {
    var block = document.getElementById("channel-main_message-list");
    block.scrollTop = block.scrollHeight;
  }
  return (
    <div className="app-wrapper" onLoad={scrollDown}>
      <Sidebar />
      <Channel />
    </div>
  );
}
export default Channels;
