import { createContext, useContext, useState } from "react";
import apiClient from "../../api/apiClient";
import { executeJwtAuthenticationService } from "../../api/authenticationApiService";
// 1. create a context
const AuthContext = createContext();

// 3. share the created context with other component
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  // 2. put some state in the context
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState("");

  // const login = (username, password) => {
  //   if (username.toLowerCase() === "alex" && password === "pass") {
  //     setIsAuth(true);
  //     setUser({ username: username });
  //     return true;
  //   }
  //   return false;
  // };

  // const login = async (username, password) => {
  //   const baToken = "Basic " + window.btoa(username + ":" + password);
  //   try {
  //     const response = await apiClient("/basicauth", {
  //       headers: { Authorization: baToken },
  //     });
  //     if (response.status === 200) {
  //       setIsAuth(true);
  //       setUser({ username: username, token: token });
  //       setToken(baToken);
  //       apiClient.interceptors.request.use((config) => {
  //         console.log("interceted and auth token inserted");
  //         config.headers.Authorization = baToken;
  //         return config;
  //       });
  //       return true;
  //     } else {
  //       logout();
  //     }
  //   } catch (error) {
  //     logout();
  //     console.log(error);
  //   }
  // };

  const login = async (username, password) => {
    try {
      const response = await executeJwtAuthenticationService(
        username,
        password
      );

      if (response.status === 200) {
        const jwtToken = "Bearer " + response.data.token;
        setIsAuth(true);
        setUser({ username: username, token: token });
        setToken(jwtToken);

        apiClient.interceptors.request.use((config) => {
          console.log("interceted and auth token inserted ", jwtToken);
          config.headers.Authorization = jwtToken;
          return config;
        });

        return true;
      } else {
        logout();
      }
    } catch (error) {
      logout();
      console.log(error);
    }
  };

  const logout = () => {
    setIsAuth(false);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
