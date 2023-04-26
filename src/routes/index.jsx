import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";
import { Profile, Board, Home, Login, SignUp} from "../pages/index"
import { Navbar } from "../components/index";

const Routes = () => {
  const { pathname } = useLocation();

  return (
    <>
      {!pathname.includes("sign") && <Navbar />}

      <Switch>
        <PrivateRoute path="/account" exact component={Profile} />
        <PrivateRoute path="/boards" exact component={Home} />
        <PrivateRoute path="/b/:id/" component={Board} />
        <Route path="/sign-in" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Redirect from="/" to="/boards" />
      </Switch>
    </>
  );
}

export default Routes
