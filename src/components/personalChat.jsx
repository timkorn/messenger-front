import Sidebar from "./sidebar/sidebar.jsx";
import PersMessageChat from "./chat/persMessageList.jsx";
import ChatMain from "./chat/chatMain.jsx";
function PersonalChat() {
  return (
    <div className="app-wrapper">
      <Sidebar />
      <PersMessageChat />
      <ChatMain />
    </div>
  );
}
export default PersonalChat;
