import React from "react";
import { FaHome, FaBell, FaUserCircle } from "react-icons/fa";
import "../App.css";

function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <span className="navbar-logo">StackIt</span>
      </div>
      <div className="navbar-right">
        <FaHome className="nav-icon" />
        <FaBell className="nav-icon" />
        <FaUserCircle className="nav-icon" />
      </div>
    </nav>
  );
}

export default Navbar;
