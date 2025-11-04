import React, { createContext, useEffect, useState } from "react";
import AuthService from "../services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // token: string, userId: number (from backend), userEmail optional
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");

  // Sync state with localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (userId) localStorage.setItem("userId", userId);
    else localStorage.removeItem("userId");
  }, [userId]);

  useEffect(() => {
    if (userEmail) localStorage.setItem("userEmail", userEmail);
    else localStorage.removeItem("userEmail");
  }, [userEmail]);

  const login = async (emailOrUsername, password) => {
    try {
      // AuthService.login should return { token, id } now
      const res = await AuthService.login(emailOrUsername, password);
      
      if (res.token && res.id) {
        setToken(res.token);
        setUserId(res.id); // store userId from backend
        setUserEmail(emailOrUsername); // optional for display
        return { success: true };
      } else {
        return { success: false, message: res.message || "Login failed" };
      }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  const register = async (name, email, password) => {
    const res = await AuthService.register(name, email, password);
    return res;
  };

  const logout = () => {
    setToken("");
    setUserId("");
    setUserEmail("");
  };

  return (
    <AuthContext.Provider
      value={{ token, userId, userEmail, setUserId, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
