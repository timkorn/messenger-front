import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
export default AuthContext;
export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  let navigate = useNavigate();
  let registerUser = async (data) => {
    const email = data.email;
    const password = data.password;
    const name = data.name;

    let response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email, password, name }),
    });

    let result = await response.json();
    if (response.status === 200) {
      try {
        setAuthTokens(result);
        setUser(jwt_decode(result.access_token));
        localStorage.setItem("authTokens", JSON.stringify(result));
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      throw new Error();
    }
  };
  let loginUser = async (data) => {
    const email = data.email;
    const password = data.password;

    let response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    let result = await response.json();
    if (response.status === 200) {
      try {
        setAuthTokens(result);
        setUser(jwt_decode(result.access_token));
        localStorage.setItem("authTokens", JSON.stringify(result));
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      throw new Error();
    }
  };
  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };
  let contextData = {
    loginUser: loginUser,
    user: user,
    logoutUser: logoutUser,
    registerUser: registerUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
