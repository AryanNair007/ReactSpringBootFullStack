import React from "react";
import { useAuth } from "../Security/AuthContext";
import { Navigate } from "react-router-dom";

function AuthenticatedRoute({ children }) {
  const authcontext = useAuth();
  if (authcontext.isAuth) return children;
  return <Navigate to="/" />;
}

export default AuthenticatedRoute;
