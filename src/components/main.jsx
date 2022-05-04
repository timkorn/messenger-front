import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/sidebar.jsx";
const Main = () => {
  return (
    <div className="app-wrapper">
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default Main;
