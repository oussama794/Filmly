import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("filmlyUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login user
  const login = (username, password) => {
    const storedUser = JSON.parse(localStorage.getItem("filmlyUser"));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      setUser(storedUser);
      return true;
    }
    return false;
  };

  // Signup user
  const signup = (username, password) => {
    const newUser = { username, password, bio: "", avatar: "", social: "" };
    localStorage.setItem("filmlyUser", JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("filmlyUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
