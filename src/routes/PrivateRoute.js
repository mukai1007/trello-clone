import { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

import { firebase } from "../firebase";

import { Loader } from "../components/index";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoadingAuth(false);
    });
  }, []);

  return loadingAuth ? (
    <Loader />
  ) : (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} authenticated={authenticated} />
        ) : (
          <Redirect to={{ pathname: "/sign-in" }} />
        )
      }
    />
  );
};


