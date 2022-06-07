import { useContext, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import TeamContext from "../context/TeamContext.jsx";
import Sidebar from "./sidebar/sidebar.jsx";

const Main = ({ type }) => {
  const { teams, sendTeam } = useContext(TeamContext);
  const { id } = useParams();
  useEffect(() => {
    sendTeam(id);
  }, [id]);
  return (
    <div className="app-wrapper">
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default Main;
