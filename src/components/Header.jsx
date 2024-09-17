import React from "react";
import logo from "../images/Logo.svg";
import { Link, useLocation } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { useLogOut } from "../hooks/useLogOut";
import { FcBusinessContact } from "react-icons/fc";

function Header() {
  const { user } = useAuthContext();
  const { logout } = useLogOut();
  const location = useLocation().pathname;

  const isActive = (path) => location === path;

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Logo"
            width="100"
            height="60"
            className="d-inline-block align-text-top"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item ">
              <Link
                className={`nav-link ${isActive("/") ? "active" : ""}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  isActive("/certificates") ? "active" : ""
                }`}
                to="/certificates"
              >
                Certificates
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/about") ? "active" : ""}`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/contact") ? "active" : ""}`}
                to="/contact"
              >
                Contact
              </Link>
            </li>
            <li className="nav-item">
              {user ? (
                <span className="nav-link text-info">
                  {user.user.username} {""}
                  <FcBusinessContact size={25} />
                </span>
              ) : (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              )}
            </li>
            <li className="nav-item">
              {user ? (
                <button className="btn btn-danger" onClick={logout}>
                  Logout
                </button>
              ) : (
                ""
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
