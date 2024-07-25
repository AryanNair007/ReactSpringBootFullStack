import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Security/AuthContext";
import { getHelloWorldPathVariable } from "../../api/hello-world";

function WelcomeCompoenent() {
  const authContext = useAuth();
  let name = authContext.user.username;
  if (name) name = name.substr(0, 1).toUpperCase() + name.substr(1);

  const [message, setMessage] = useState(null);

  const callHelloWorldRestApi = () => {
    getHelloWorldPathVariable(authContext.user.username)
      .then((res) => {
        console.log(res.data.message);
        setMessage(res.data.message);
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("cleanup"));
  };

  return (
    <div className="welcome-component">
      <h1>Welcome to Todo Application, {name}</h1>
      <div className="welcome-msg">
        Manage your todos - <Link to="/todos">Go Here</Link>
      </div>
      <div>
        <button className="bth btn-success m-5" onClick={callHelloWorldRestApi}>
          Call Hello World
        </button>
        <div className="text-info">{message}</div>
      </div>
    </div>
  );
}

export default WelcomeCompoenent;
