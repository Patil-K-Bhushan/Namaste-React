import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const useSignInForm = () => {
  const [name, setName] = useState("");
  const { setUserName } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDone = () => {
    if (!name.trim()) return;
    setUserName(name);
    navigate("/");
  };

  const handleClose = () => navigate("/");

  return { name, setName, handleDone, handleClose };
};

export default useSignInForm;
