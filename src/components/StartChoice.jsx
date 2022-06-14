import { useState, useContext, useEffect } from "react";
import Loading from "./Loading.jsx";
import ShowTeamsItem from "./ShowTeamsItem";
import TeamContext from "../context/TeamContext";
import { useNavigate } from "react-router-dom";
import CreateTeam from "./dialogs/CreateTeam/CreateTeam.js";
import MyTextButton from "./MyTextButton/index.js";
import Button from "@mui/material/Button";
import AuthContext from "../context/AuthContext.jsx";
function StartChoice() {
  const [loading, setLoading] = useState(true);
  const { teams, showTeams } = useContext(TeamContext);
  const [openCreate, setOpenCreate] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleCreateOpen = () => {
    setOpenCreate(true);
  };
  const handleCreateClose = () => {
    setOpenCreate(false);
  };
  useEffect(() => {
    const f = async () => {
      let result = await showTeams().catch((err) => console.log(err));
      if (localStorage.getItem("team")) {
        if (localStorage.getItem("team") in result.id) {
          navigate(`/${localStorage.getItem("team")}`);
        }
      }
      setLoading(false);
    };
    f();
  }, []);
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div
        style={{
          width: "100vw",
          display: "flex",
          paddingTop: "70px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>{user.sub}, добро пожаловать в corporate!!!</h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {teams.id.length != 0 ? (
            <>
              <div
                style={{
                  borderRadius: "100px",
                  height: "200px",
                  width: "200px",
                  overflow: "hidden",
                }}
                className="logostarter-positive"
              />
              <p style={{ fontSize: "20px", marginTop: "30px" }}>
                Выберите команду
              </p>
              {teams.id.map((item, index) => (
                <ShowTeamsItem
                  fontSize="30px"
                  id={item}
                  name={teams.name[index]}
                  key={item}
                />
              ))}
              <Button
                onClick={handleCreateOpen}
                variant="outlined"
                style={{ marginTop: "10px" }}
              >
                Создать команду
              </Button>
              <CreateTeam open={openCreate} handleClose={handleCreateClose} />
            </>
          ) : (
            <>
              <div
                style={{
                  borderRadius: "100px",
                  height: "210px",
                  width: "210px",
                  overflow: "hidden",
                }}
                className="logostarter-negative"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "40px",
                }}
              >
                <p style={{ fontSize: "20px" }}>
                  Вы не состоите ни в одной команде
                </p>
                <Button onClick={handleCreateOpen} variant="outlined">
                  Создать команду
                </Button>
                <CreateTeam open={openCreate} handleClose={handleCreateClose} />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default StartChoice;
