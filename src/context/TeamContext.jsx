import { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
const TeamContext = createContext();
export default TeamContext;

export const TeamProvider = ({ children }) => {
  const { logoutUser, authTokens } = useContext(AuthContext);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [teams, setTeams] = useState(null);
  const sendTeam = (id) => {
    setCurrentTeam(id);
    localStorage.setItem("team", id);
  };
  async function showTeams() {
    let response = await fetch("http://localhost:8080/teams/showTeams", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(authTokens.accessToken),
      },
    });
    let result = await response.json();

    if (response.status === 200) {
      setTeams(result);
      return result;
    } else if (result.error === "Unauthorized") {
      logoutUser();
    } else {
      throw new Error();
    }
  }

  let contextData = { showTeams, teams, sendTeam };
  return (
    <TeamContext.Provider value={contextData}>{children}</TeamContext.Provider>
  );
};
