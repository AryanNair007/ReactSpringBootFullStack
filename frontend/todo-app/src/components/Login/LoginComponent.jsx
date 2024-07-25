import React, { useState } from "react";
import "./LoginComponent.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Security/AuthContext";
function LoginComponent() {
  const authContext = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(null);

  const navigate = useNavigate();

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.code === "NumpadEnter") {
      onSubmit();
    }
  };
  const onSubmit = () => {
    if (authContext.login(username, password)) {
      navigate(`/welcome/${username}`);
    } else {
      setIsAuth(false);
    }
  };

  const isAuthenticated = () => {
    if (isAuth == null) return;

    let styleVal = "message";
    let displayMessage = "Please check your credentials";

    return <div className={styleVal}>{displayMessage}</div>;
  };

  return (
    <div>
      <div className="login-title">Login</div>
      <div className="form">
        {isAuthenticated()}
        <div className="field">
          <label>User Name</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={onUsernameChange}
            onKeyDown={onKeyDown}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={onPasswordChange}
            onKeyDown={onKeyDown}
          />
        </div>
        <div className="submit-button">
          <button type="submit" onClick={onSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
