import React, { useState, useContext } from "react";
import "./styles/Header.css";
import { LuUser } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { IoCallSharp } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { IoInformationCircle } from "react-icons/io5";
import Logo from "url:../assets/NamasteFood.png";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="Header">
      <div className="Logo-Container">
        <img src={Logo} alt="Namaste Food logo" className="logo-image" />
      </div>

      <button
        className={`hamburger ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-items ${isMenuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li>Online Status: {onlineStatus ? "🟢" : "🔴"}</li>
          <li>
            <Link to={"/"} onClick={closeMenu}>
              <IoHomeOutline /> Home
            </Link>
          </li>
          <li>
            <Link to={"/about"} onClick={closeMenu}>
              <IoInformationCircle /> About Us
            </Link>
          </li>
          <li>
            <Link to={"/contact"} onClick={closeMenu}>
              <IoCallSharp /> Contact Us
            </Link>
          </li>
          <li>
            <Link to={"/cart"} onClick={closeMenu}>
              <IoCartOutline /> Cart - ({totalItems} Items)
            </Link>
          </li>
          <li>
            <Link to={"/search"} onClick={closeMenu}>
              <CiSearch /> Search
            </Link>
          </li>
          <li>
            <Link to={"/signIn"} onClick={closeMenu}>
              <LuUser /> {loggedInUser}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
