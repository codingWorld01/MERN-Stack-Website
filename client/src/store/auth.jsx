import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
    const API = "https://servicenow-backend.vercel.app";

  const storeTokenInLS = (serverToken) => {
    // console.log(serverToken)
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };


  let isLoggedIn = !!token;
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem('token');
  }

  const authorizedUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/user`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUser(data);
        setLoading(false);
      }
    }
    catch (error) {
      console.log(`Error in authorizedUser ${error}`);
    }
  }


  const getServiceData = async () => {
    try {
      const response = await fetch(`${API}/service`, {
        method: "GET",
      });
      if (response.ok) {
        const services = await response.json();
        // console.log("getservice", services);
        setServices(services);
      }
      // console.log("service ", response);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getServiceData();
    authorizedUser();
  }, []);


  return (
    <AuthContext.Provider value={{ LogoutUser, storeTokenInLS, isLoggedIn, user, services, token, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
