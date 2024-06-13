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
      throw new Error("Email already exists.");
    }

    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    const newUser = { ...userData, password: hashedPassword };
    toast.success("Signup Successfull");
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return newUser;
  };

  const login = (email, password) => {
    const storedUsersData = localStorage.getItem("users");
    const users = storedUsersData ? JSON.parse(storedUsersData) : [];

    const user = users.find((user) => user.email === email);

    if (!user) {
      throw new Error("User not found. Please sign up.");
    }

    const isPasswordValid =
      user.password.startsWith("$2a$") // Check if password is hashed
        ? bcrypt.compareSync(password, user.password)
        : password === user.password;

    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }

    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");

    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully.");
  };

  const updateUserProfile = (updatedData) => {
    const storedUsersData = localStorage.getItem("users");
    const users = storedUsersData ? JSON.parse(storedUsersData) : [];

    const userIndex = users.findIndex((user) => user.email === currentUser.email);

    const updatedUser = {
      ...users[userIndex],
      ...updatedData,
    };

    const updatedUsers = [
      ...users.slice(0, userIndex),
      updatedUser,
      ...users.slice(userIndex + 1),
    ];

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setCurrentUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    toast.success("Profile updated successfully.");
  };

  const updatePassword = (newPassword) => {
    const storedUsersData = localStorage.getItem("users");
    const users = storedUsersData ? JSON.parse(storedUsersData) : [];

    const userIndex = users.findIndex((user) => user.email === currentUser.email);

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    const updatedUser = {
      ...users[userIndex],
      password: hashedPassword,
    };

    const updatedUsers = [
      ...users.slice(0, userIndex),
      updatedUser,
      ...users.slice(userIndex + 1),
    ];

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setCurrentUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    toast.success("Password updated successfully.");
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