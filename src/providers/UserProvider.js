import { createContext, useEffect, useState } from "react";

import { firebase } from "../firebase";

export const UserContext = createContext({ user: null });

const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth.onAuthStateChanged((userAuth) => {
      setUser(userAuth);
    });
  }, []);
  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

export default UserProvider
