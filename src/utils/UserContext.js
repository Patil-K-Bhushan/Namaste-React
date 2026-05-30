import { createContext } from "react";

const UserContext = createContext({
  loggedInUser: "Sign In",
  setUserName: () => {},
});

export default UserContext;