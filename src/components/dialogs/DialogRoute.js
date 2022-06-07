import { Route, useMatch } from "react-router-dom";

function DialogRoute(children) {
  const { url } = useMatch();
  return <Route />;
}

export default DialogRoute;
