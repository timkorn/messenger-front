import PersonalChat from "./components/personalChat.jsx";
import Channel from "./components/channel.jsx";
import { Login } from "./components/login.jsx";
import Register from "./components/register.jsx";
import NotFound from "./components/notFound.jsx";
import Main from "./components/main.jsx";
import PrivateRoute from "./components/PrivaterRoute/PrivateRoute.jsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ChatProvider } from "./context/ChatContext.jsx";
import Attachment from "./components/dialogs/Attachment";
import AudioCall from "./components/dialogs/AudioCall";
import GroupChat from "./components/GroupChat.jsx";
import { TeamProvider } from "./context/TeamContext.jsx";
import StartChoice from "./components/StartChoice.jsx";
import Data from "./components/Data.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <TeamProvider>
                  <Data />
                  <StartChoice />
                </TeamProvider>
              </PrivateRoute>
            }
          />
          <Route
            path="/:id"
            element={
              <PrivateRoute>
                <TeamProvider>
                  <Data />
                  <Main />
                </TeamProvider>
              </PrivateRoute>
            }
          >
            <Route
              path="channel/:chatid"
              element={
                <ChatProvider>
                  <Channel />
                </ChatProvider>
              }
            >
              <Route path="attachment" element={<Attachment />} />

              <Route path="*" element={<NotFound />} />
            </Route>
            <Route
              path="chat/:chatid"
              element={
                <ChatProvider>
                  <PersonalChat />
                </ChatProvider>
              }
            >
              <Route path="attachment" element={<Attachment />} />
              <Route path="audiocall" element={<AudioCall />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route
              path="groupchat/:chatid"
              element={
                <ChatProvider>
                  <GroupChat />
                </ChatProvider>
              }
            >
              <Route path="attachment" element={<Attachment />} />
              <Route path="audiocall" element={<AudioCall />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route
              path=""
              element={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    flexDirection: "column",
                  }}
                >
                  <span>Выберите канал или создайте его</span>
                </div>
              }
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
