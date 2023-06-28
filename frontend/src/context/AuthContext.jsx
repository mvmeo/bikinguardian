import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, deleteAccountRequest, changePasswordRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro del proveedor AuthContext");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  }

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get("token");
      if (!cookies) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(cookies);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  const deleteAccount = async (id) => {
    try {
      await deleteAccountRequest(id);
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  const changePassword = async (passwords) => {
    try {
      await changePasswordRequest(passwords);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        deleteAccount,
        changePassword,
        loading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};