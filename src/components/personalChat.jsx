import PersMessageChat from "./chat/persMessageList.jsx";
import ChatMain from "./chat/chatMain.jsx";
function PersonalChat() {
  console.log("Personal");
  return (
    <>
      <PersMessageChat />
      <ChatMain />
    </>
  );
}
export default PersonalChat;
