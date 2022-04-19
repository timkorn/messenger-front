import PersonalChat from "./components/personalChat.jsx";
import Channels from "./components/channels.jsx";
import { Login } from "./components/login.jsx";
import Register from "./components/register.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*         <Route exact path="/authorization" /> */}
        <Route path="/" element={<Channels />} />
        <Route path="/chat" element={<PersonalChat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
