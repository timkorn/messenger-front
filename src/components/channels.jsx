import Channel from "./channel/channel.jsx";
function Channels() {
  function scrollDown() {
    var block = document.getElementById("channel-main_message-list");
    block.scrollTop = block.scrollHeight;
  }
  return (
    <>
      <Channel />
    </>
  );
}
export default Channels;
