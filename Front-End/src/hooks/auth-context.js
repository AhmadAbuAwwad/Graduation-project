/**
 * This context file used to manage login and logout process in the website
 */

import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [showNav, setShowNav] = useState(false);
  /**
   * Read user email and role from the database whenver login process occurs
   * @param {} user represent user email which's the primary key
   * @returns boolean represent the login procsses result, user email and user role
   */

  const login = async (user) => {
    let RES;
    let userRole;

    /**
     * send request to the backend to get the user login information and status
     */

    const response = await fetch(
      `http://localhost:8080/api/userlogin/getUserLogin/${user}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    // result from the api request from the backend
    const result = await response.json();

    // in the backend attributes name must be email and role
    setUser(result.email);
    setIsLoggedIn(true);
    setRole(result.role);
    RES = true;
    userRole = result.role;

    localStorage.setItem("user", user);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("role", userRole);

    return { RES, user, userRole};
  };

  /**
   * Used to clear login data when the user logout
   */

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.clear();
  };

  const showNavigation = () => {
    setShowNav(true);
  };

  const hideNavigation = () => {
    setShowNav(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        role,
        isLoggedIn,
        showNav,
        showNavigation,
        hideNavigation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
