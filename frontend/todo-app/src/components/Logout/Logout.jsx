import React from "react";
import { Link } from "react-router-dom";

function Logout() {
  return (
    <div className="logout">
      <h1>You are logged out</h1>
      <div>Thank you for using our App.</div>
      <div>
        <Link to="/login">Go back to Login Page!</Link>
      </div>
    </div>
  );
}

export default Logout;
