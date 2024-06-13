
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const storedCurrentUser = localStorage.getItem("currentUser");
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []);

  const signup = (userData) => {
    const storedUsersData = localStorage.getItem("users");
    const users = storedUsersData ? JSON.parse(storedUsersData) : [];

    if (users.find((user) => user.email === userData.email)) {
      toast.error("Email already exists.");
      return;
    }

    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    const newUser = { ...userData, password: hashedPassword };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Account created successfully. Please log in.");
  };

  const login = (email, password) => {
    const storedUsersData = localStorage.getItem("users");
    const users = storedUsersData ? JSON.parse(storedUsersData) : [];

    const user = users.find((user) => user.email === email);

    if (!user) {
      toast.error("User not found. Please sign up.");
      return;
    }

    setCurrentUser(user);

    const isPasswordValid = bcrypt.compareSync(password, user.hashedPassword);
    if (!isPasswordValid) {
      toast.error("Invalid email or password.");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    toast.success("Logged in successfully.");
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully.");
  };

  const updateUserProfile = (updatedData) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));

    const storedUsersData = localStorage.getItem("users");
    const users = storedUsersData ? JSON.parse(storedUsersData) : [];

    const updatedUsers = users.map((user) =>
      user.email === currentUser.email ? { ...user, ...updatedData } : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        ...currentUser,
        ...updatedData,
      })
    );

    toast.success("Profile updated successfully.");
  };

  const updatePassword = (currentPassword, newPassword) => {
    const storedUsersData = localStorage.getItem("users");
    const users = storedUsersData ? JSON.parse(storedUsersData) : [];

    const user = users.find((user) => user.email === currentUser.email);
    if (!user) {
      toast.error("User data not found.");
      return;
    }

    const isPasswordValid = bcrypt.compareSync(
      currentPassword,
      user.hashedPassword
    );
    if (!isPasswordValid) {
      toast.error("Invalid current password.");
      return;
    }

    const newHashedPassword = bcrypt.hashSync(newPassword, 10);

    setCurrentUser((prevUser) => ({
      ...prevUser,
      hashedPassword: newHashedPassword,
    }));

    const updatedUsers = users.map((u) =>
      u.email === currentUser.email
        ? { ...u, hashedPassword: newHashedPassword }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        ...currentUser,
        hashedPassword: newHashedPassword,
      })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        login,
        logout,
        updateUserProfile,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
