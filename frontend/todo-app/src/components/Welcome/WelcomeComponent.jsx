import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Security/AuthContext";

function WelcomeCompoenent() {
  const authContext = useAuth();
  let name = authContext.user.username;
  if (name) name = name.substr(0, 1).toUpperCase() + name.substr(1);

  return (
    <div className="welcome-component">
      <h1>Welcome to Todo Application, {name}</h1>
      <div className="welcome-msg">
        Manage your todos - <Link to="/todos">Go Here</Link>
      </div>
    </div>
  );
}

export default WelcomeCompoenent;
