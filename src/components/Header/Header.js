import React from "react";
import "./Header.css";
import { LuUser } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline, IoCallSharp, IoHomeOutline, IoInformationCircle } from "react-icons/io5";
import Logo from "url:../../assets/NamasteFood.png";
import { Link } from "react-router-dom";
import useHeaderState from "../../hooks/useHeaderState";

const Header = () => {
  const { isMenuOpen, toggleMenu, closeMenu, onlineStatus, loggedInUser, totalItems } = useHeaderState();

  return (
    <div className="Header">
      <div className="Logo-Container">
        <img src={Logo} alt="Namaste Food logo" className="logo-image" />
      </div>
      <button className={`hamburger ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu} aria-label="Toggle navigation menu" aria-expanded={isMenuOpen}>
        <span></span><span></span><span></span>
      </button>
      <div className={`nav-items ${isMenuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li>Online Status: {onlineStatus ? "🟢" : "🔴"}</li>
          <li><Link to="/" onClick={closeMenu}><IoHomeOutline /> Home</Link></li>
          <li><Link to="/about" onClick={closeMenu}><IoInformationCircle /> About Us</Link></li>
          <li><Link to="/contact" onClick={closeMenu}><IoCallSharp /> Contact Us</Link></li>
          <li><Link to="/cart" onClick={closeMenu}><IoCartOutline /> Cart - ({totalItems} Items)</Link></li>
          <li><Link to="/search" onClick={closeMenu}><CiSearch /> Search</Link></li>
          <li><Link to="/signIn" onClick={closeMenu}><LuUser /> {loggedInUser}</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
