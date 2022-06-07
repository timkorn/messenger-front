import { useMatch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import chosen from "../sidebar/img/chosen.svg";
function ShowTeamsItem({
  name,
  id,
  setNewActiveLink,
  newActiveLink,
  fontSize,
  ...props
}) {
  const match = useMatch(`/${id}/*`);
  return (
    <NavLink to={`/${id}`} className="sidebar_choice" {...props}>
      <div className="team-popover-choice-container">
        <div style={{ fontSize: "25px" }}>
          <p>{name}</p>
        </div>
        {match && <img src={chosen} />}
      </div>
    </NavLink>
  );
}
export default ShowTeamsItem;
