import { createContext, useContext, useState } from "react";

// 1. create a context
const AuthContext = createContext();

// 3. share the created context with other component
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  // 2. put some state in the context
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const login = (username, password) => {
    if (username.toLowerCase() === "alex" && password === "pass") {
      setIsAuth(true);
      setUser({ username: username });
      return true;
    }
    return false;
  };
  const logout = () => {
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
