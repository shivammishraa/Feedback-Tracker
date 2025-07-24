import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Homepage from "./pages/Homepage";
import { saveUserToLocalStorage, getUserFromLocalStorage } from "./utils";

export default function App() {
  const [user, setUser] = useState(() => getUserFromLocalStorage());
  const [error, setError] = useState("");

  const handleLogin = (userData) => {
    saveUserToLocalStorage(userData);
    setUser(userData);
    setError("");
  };

  const handleSignup = (userData) => {
    saveUserToLocalStorage(userData);
    setUser(userData);
    setError("");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={user ? "/homepage" : "/login"} />}
      />
      <Route
        path="/login"
        element={<Login onLogin={handleLogin} setError={setError} />}
      />
      <Route
        path="/signup"
        element={<Signup onSignup={handleSignup} setError={setError} />}
      />
      <Route
        path="/homepage"
        element={
          user ? (
            <Homepage user={user} setUser={setUser} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      {/* Fallback for undefined routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
