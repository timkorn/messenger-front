import PersonalChat from "./components/personalChat.jsx";
import Channels from "./components/channels.jsx";
import { Login } from "./components/login.jsx";
import Register from "./components/register.jsx";
import NotFound from "./components/notFound.jsx";
import Main from "./components/main.jsx";
import PrivateRoute from "./components/PrivaterRoute/PrivateRoute.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          >
            <Route
              path="channel"
              element={
                <PrivateRoute>
                  <Channels />
                </PrivateRoute>
              }
            />
            <Route
              path="chat"
              element={
                <PrivateRoute>
                  <PersonalChat />
                </PrivateRoute>
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
