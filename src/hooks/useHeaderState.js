import { useState, useContext } from "react";
import { useSelector } from "react-redux";
import useOnlineStatus from "./useOnlineStatus";
import UserContext from "../contexts/UserContext";

const useHeaderState = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu,
    onlineStatus,
    loggedInUser,
    totalItems,
  };
};

export default useHeaderState;
