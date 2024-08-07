import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Security/AuthContext";

function Header() {
  const authContext = useAuth();
  return (
    <header className="border-bottom border-light border-5 mb-5 p-2">
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-lg">
            <div className="navbar-brand ms-2 fs-2 fw-bold text-black">
              todoApp
            </div>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item ">
                  {authContext.isAuth && (
                    <Link
                      className="nav-link"
                      to={`/welcome/${authContext.user.username}`}
                    >
                      Home
                    </Link>
                  )}
                </li>
                <li className="nav-item ">
                  {authContext.isAuth && (
                    <Link className="nav-link" to="/todos">
                      Todos
                    </Link>
                  )}
                </li>
              </ul>
            </div>
            <ul className="navbar-nav">
              <li className="nav-item">
                {!authContext.isAuth && (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {authContext.isAuth && (
                  <Link
                    className="nav-link"
                    to="/logout"
                    onClick={authContext.logout}
                  >
                    Logout
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
