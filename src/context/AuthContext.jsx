import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
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
  let [loading, setLoading] = useState(true);
  let [userData, setUserData] = useState(true);
  let navigate = useNavigate();
  let registerUser = async (data) => {
    const email = data.email;
    const password = data.password;
    const name = data.name;
    const avatar = data.avatar;
    let response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email, password, name, avatar }),
    });

    let result = await response.json();
    if (response.status === 200) {
      try {
        setAuthTokens(result);
        setUser(jwt_decode(result.accessToken));
        localStorage.setItem("authTokens", JSON.stringify(result));
        navigate("/");
      } catch (err) {
        console.log(err);
        throw new Error();
      }
    } else {
      throw new Error();
    }
  };
  let updateToken = async (data) => {
    let response = await fetch("http://localhost:8080/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: authTokens?.refreshToken }),
    });
    let result = await response.json();
    if (response.status === 200) {
      try {
        setAuthTokens(result);
        setUser(jwt_decode(result.accessToken));
        localStorage.setItem("authTokens", JSON.stringify(result));
      } catch (err) {
        logoutUser();
      }
    } else {
      logoutUser();
    }
    if (loading) {
      setLoading(false);
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
        setUser(jwt_decode(result.accessToken));
        localStorage.setItem("authTokens", JSON.stringify(result));
        navigate("/");
      } catch (err) {
        throw new Error();
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
  async function changeData(data, photo, name) {
    let newPassword = data.newPassword;
    let oldPassword = data.oldPassword;
    let newAva = data.photo;
    let newUsername = data.name;
    if (!(newPassword && oldPassword)) {
      newPassword = false;
      oldPassword = false;
    }
    if (photo) {
      newAva = false;
    }
    if (name) {
      newUsername = false;
    }
    let response = await fetch("http://localhost:8080/change/userData", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(authTokens.accessToken),
      },
      body: JSON.stringify({ newPassword, oldPassword, newAva, newUsername }),
    });
    let result = await response.json();
    if (response.status === 200) {
      setAuthTokens(result);
      setUser(jwt_decode(result.accessToken));
      localStorage.setItem("authTokens", JSON.stringify(result));
      return true;
    } else if (result.error === "Unauthorized") {
      logoutUser();
    } else {
      throw new Error();
    }
  }
  let contextData = {
    loginUser: loginUser,
    user: user,
    logoutUser: logoutUser,
    registerUser: registerUser,
    logout: logoutUser,
    authTokens: authTokens,
    changeData,
  };
  let minutes = 1000 * 60;
  useEffect(() => {
    if (loading) {
      if (authTokens) {
        updateToken();
      } else {
        setLoading(false);
      }
    }
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, minutes * 10);
    return () => {
      clearInterval(interval);
    };
  }, [authTokens, loading]);
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
